export const updateField = (text) => {
    return {
        type: 'UPDATE_FIELD',
        text
      }
}


export const createText = (text) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const collection = text.collection.toString()
        const id = text.id.toString()

        firestore.collection(collection).doc(id).update({
           ...text
        })
       
        
        .then(() => {
            dispatch({ type: 'TEXT_ADD', text })
        }).catch((err) => {
            dispatch({type: 'TEXT_ADD_ERROR', err})
        })
        
    }
}