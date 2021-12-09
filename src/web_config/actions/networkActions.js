export const updateNetwork = (network) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        console.log(network)


        // firestore.collection('network').doc('AzH1ZDuD51xqkqQ55zqg').update({
        //    id: id,
        //    image: image
        // })
       
        
        .then(() => {
            dispatch({ type: 'NETWORK_LINK_UPDATE', network })
        }).catch((err) => {
            dispatch({type: 'NETWORK_LINK_UPDATE_ERROR', err})
        })
        
    }
}