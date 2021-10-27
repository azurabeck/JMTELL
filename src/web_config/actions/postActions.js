export const createPost = (post) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const profile = getState().firebase.profile;
        const authorId = getState().firebase.auth.uid;

        console.log(post)

        firestore.collection('posts').add({
            ...post, 
            authorFirstName: profile.firstName,
            authorLastName: profile.lastName,
            authorId: authorId,
            createdAt: new Date()
        }).then(() => {
            dispatch({ type: 'CREATE_POST', post })
        }).catch((err) => {
            dispatch({type: 'CREATE_POST_ERROR', err})
        })
        
    }
}

export const editPost = (post, firebaseId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('posts').doc(firebaseId).update({
            ...post
        }).then(() => {
            dispatch({ type: 'EDIT_POST', post })
        }).catch((err) => {
            dispatch({type: 'EDIT_POST_ERROR', err})
        })
        
    }
}

export const deletePost = (firebaseId  ) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('posts').doc(firebaseId).delete()
        .then(() => {
            dispatch({ type: 'DELETE_POST', firebaseId  })
        }).catch((err) => {
            dispatch({type: 'DELETE_POST_ERROR', err})
        })
        
    }
}