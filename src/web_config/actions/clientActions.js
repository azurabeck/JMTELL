export const createClient = (client) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        console.log(client)

        firestore.collection('clients').add({
            name: client.name,
            email: client.email,
            telephone: client.telephone,
            return_type: client.returnType,
            msg: client.msg,
            subject: client.client_subject, 
            time: new Date(),

        }).then(() => {
            dispatch({ type: 'MSG_SUCCESS', client })
        }).catch((err) => {
            dispatch({type: 'MSG_ERROR', err})
        })
        
    }
}