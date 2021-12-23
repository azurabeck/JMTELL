import data from './data.json'

export const createProcuct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();


        firestore.collection('products').add({
            ...product , 
            spotlight: product.spotlight, 
            time: new Date() 
        })
       
        
        .then(() => {
            dispatch({ type: 'PRODUCT_CREATED', product })
        }).catch((err) => {
            dispatch({type: 'PRODUCT_CREATED_ERRO', err})
        })
        
    }
}

export const updateProcuct = (product , categorie) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        console.log('na action', product)

        firestore.collection('products').doc(product.id).update({
            ...product , 
            ...categorie ,
            time: new Date() 
        })
       
        
        .then(() => {
            dispatch({ type: 'PRODUCT_UPDATE', product })
        }).catch((err) => {
            dispatch({type: 'PRODUCT_UPDATE_ERRO', err})
        })
        
    }
}

export const deleteProcuct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('products').doc(product).delete()     
        .then(() => {
            dispatch({ type: 'PRODUCT_DELETE', product })
        }).catch((err) => {
            dispatch({type: 'PRODUCT_DELETE_ERRO', err})
        })
        
    }
}

export const deleteOldProcuct = (product) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        firestore.collection('products-old').doc(product).delete()     
        .then(() => {
            dispatch({ type: 'PRODUCT_DELETE', product })
        }).catch((err) => {
            dispatch({type: 'PRODUCT_DELETE_ERRO', err})
        })
        
    }
}

export const setProductCategorie = (productCategorie) => {
    return {
        type: 'SET_PRODUCT_CATEGORIE',
        productCategorie
      }
}

export const filterCategorie = (filter) => {
    return {
      type: 'PRODUCT_CATEGORIE_FILTER',
      filter
    }
}

export const createProcuctWithPreviusData = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const usercollection = data
        
        usercollection.forEach(function(obj){
            firestore.collection('oldProducts').add({
                ...obj
            })
        }).then(() => (
            console.log("done")
        ))
    }
}

export const deleteCollection = () => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();   
        
        firestore.collection('product-list').doc('Q4r6UHpgUfUQJraTOh0R').delete()
    }
}