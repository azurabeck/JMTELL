export const createProcuct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('products').add({
            name: product.name,
            description: product.description,
            details: product.details,
            aditional: product.aditional,
            model: product.model,
            time: new Date() 
        })
       
        
        .then(() => {
            dispatch({ type: 'PRODUCT_CREATED', product })
        }).catch((err) => {
            dispatch({type: 'PRODUCT_CREATED_ERRO', err})
        })
        
    }
}