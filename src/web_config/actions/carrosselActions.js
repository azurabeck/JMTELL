export const createCarrossel = (carrossel) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('carrossel').add({
           ...carrossel
        })
       
        
        .then(() => {
            dispatch({ type: 'CARROSSEL_ADD', carrossel })
        }).catch((err) => {
            dispatch({type: 'CARROSSEL_ADD_ERROR', err})
        })
        
    }
}