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