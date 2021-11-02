export const createPost = (post) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        console.log(post)

        firestore.collection('posts').add({
            ...post,
            date: new Date().toString() ,       
        })
        .then(function(docRef) {
            firestore.collection('posts').doc(docRef.id).update({
                id: docRef.id,
            })
        })
        .then(() => {
            dispatch({ type: 'CREATE_POST' })            
        }).catch((err) => {
            dispatch({type: 'CREATE_POST_ERROR', err})
        })
        
    }
}

export const editPost = (post, firebaseId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('posts').doc(post.id).update({
            ...post
        }).then(() => {
            dispatch({ type: 'EDIT_POST' })
        }).catch((err) => {
            dispatch({type: 'EDIT_POST_ERROR', err})
        })
        
    }
}

export const deletePost = (post) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('posts').doc(post.id).delete()
        .then(() => {
            dispatch({ type: 'DELETE_POST'  })
        }).catch((err) => {
            dispatch({type: 'DELETE_POST_ERROR', err})
        })
        
    }
}