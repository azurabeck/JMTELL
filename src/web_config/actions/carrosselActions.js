import { faCommentDollar } from "@fortawesome/free-solid-svg-icons";

export const updateCarrossel = (carrossel) => {

    return (dispatch, getState, { getFirebase, getFirestore }) => {
        //make async call to database
        const firestore = getFirestore();
        const id = carrossel.id
        const image = carrossel.image

        firestore.collection('carrossel').doc(id).update({
           id: id,
           image: image
        })
       
        
        .then(() => {
            dispatch({ type: 'CARROSSEL_ADD', carrossel })
        }).catch((err) => {
            dispatch({type: 'CARROSSEL_ADD_ERROR', err})
        })
        
    }
}