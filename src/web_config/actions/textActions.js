export const createText = (text) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const collection = text.collection.toString()
        const index = text.index
        firestore.collection(collection).doc('ZW7L9W1VRb5nYipOW6aZ').update({
           [index]: text.text
        })
       
        
        .then(() => {
            dispatch({ type: 'TEXT_ADD', text })
        }).catch((err) => {
            dispatch({type: 'TEXT_ADD_ERROR', err})
        })
        
    }
}