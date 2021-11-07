export const createText = (text) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('text').add({
            ...text
        })
       
        
        .then(() => {
            dispatch({ type: 'TEXT_ADD', text })
        }).catch((err) => {
            dispatch({type: 'TEXT_ADD_ERROR', err})
        })
        
    }
}