export const updateNetwork = (network) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();

        firestore.collection('network').doc(network.id).update({
           ...network , url: network.url , isVisible: network.isVisible
        })
               
        .then(() => {
            dispatch({ type: 'NETWORK_LINK_UPDATE', network })
        }).catch((err) => {
            dispatch({type: 'NETWORK_LINK_UPDATE_ERROR', err})
        })
        
    }
}