export const createText = (text) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const collection = text.collection.toString()
        const doc = text.index
        firestore.collection(collection).add({
           [doc]: text.text
        })
       
        
        .then(() => {
            dispatch({ type: 'TEXT_ADD', text })
        }).catch((err) => {
            dispatch({type: 'TEXT_ADD_ERROR', err})
        })
        
    }
}