export const updateField = (text) => {
    console.log('estou no action ' , text)
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
        firestore.collection(collection).add({
           ...text
        })
       
        
        .then(() => {
            dispatch({ type: 'TEXT_ADD', text })
        }).catch((err) => {
            dispatch({type: 'TEXT_ADD_ERROR', err})
        })
        
    }
}