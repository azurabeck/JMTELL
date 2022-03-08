export const createClient = (client) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('clients').add({
            name: client.name,
            email: client.email,
            telephone: client.telephone,
            return_type: client.returnType,
            read: false,
            createdAt: new Date(), 
            cnpj: client.cnpj ? client.cnpj : null,
            state: client.state ? client.state : null,
            city: client.city ? client.city : null,
            projectType: client.projectType ? client.projectType : null,
            subject: client.client_subject === 'Solicitação de projeto' ? 'Projeto' : 'Contato',
            msg: { text: client.msg, subject: client.client_subject, time: new Date() }
        })
        .then(function(docRef) {
            firestore.collection('clients').doc(docRef.id).update({
                id: docRef.id,
            })
        })
        
        .then(() => {
            dispatch({ type: 'MSG_SUCCESS', client })
        }).catch((err) => {
            dispatch({type: 'MSG_ERROR', err})
        })
        
    }
}

export const updateClient = (client) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('clients').doc(client.id).update({
            ...client , read: true,
        })
       
        
        .then(() => {
            dispatch({ type: 'MSG_SUCCESS', client })
        }).catch((err) => {
            dispatch({type: 'MSG_ERROR', err})
        })
        
    }
}