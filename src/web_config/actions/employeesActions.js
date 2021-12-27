export const addEmployees = (employees) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('employees').add({
            ...employees
        }).then(function(docRef) {
            firestore.collection('employees').doc(docRef.id).update({
                id: docRef.id,
            })
        })
               
        .then(() => {
            dispatch({ type: 'EMPLOYEES_ADD', employees })
        }).catch((err) => {
            dispatch({type: 'EMPLOYEES_ADD_ERROR', err})
        })
        
    }
}


export const updateEmployees = (employees) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('employees').doc(employees.id).update({
            ...employees
        })
        .then(() => {
            dispatch({ type: 'EMPLOYEES_UPDATE', employees })
        }).catch((err) => {
            dispatch({type: 'EMPLOYEES_UPDATE_ERROR', err})
        })
        
    }
}

export const deleteEmployees = (employees) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('employees').doc(employees).delete()
        .then(() => {
            dispatch({ type: 'EMPLOYEES_DELETE', employees })
        }).catch((err) => {
            dispatch({type: 'EMPLOYEES_DELETE_ERROR', err})
        })
        
    }
}





// PHONE


export const addPhone = (phone) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('phone').add({
            ...phone
        }).then(function(docRef) {
            firestore.collection('phone').doc(docRef.id).update({
                id: docRef.id,
            })
        })
               
        .then(() => {
            dispatch({ type: 'PHONE_ADD', phone })
        }).catch((err) => {
            dispatch({type: 'PHONE_ADD_ERROR', err})
        })
        
    }
}


export const updatePhone = (phone) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('phone').doc(phone.id).update({
            ...phone
        })
        .then(() => {
            dispatch({ type: 'PHONE_UPDATE', phone })
        }).catch((err) => {
            dispatch({type: 'PHONE_UPDATE_ERROR', err})
        })
        
    }
}

export const deletePhone = (phone) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('phone').doc(phone).delete()
        .then(() => {
            dispatch({ type: 'PHONE_DELETE', phone })
        }).catch((err) => {
            dispatch({type: 'PHONE_DELETE_ERROR', err})
        })
        
    }
}


