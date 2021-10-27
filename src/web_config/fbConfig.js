import firebase from 'firebase/app';
import 'firebase/firestore'
import 'firebase/auth'


// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDKAhFU3LMzJ06mcNHlJ0x8jrL0dvFOPQw",
    authDomain: "jmtell.firebaseapp.com",
    projectId: "jmtell",
    storageBucket: "jmtell.appspot.com",
    messagingSenderId: "550594434247",
    appId: "1:550594434247:web:7b56d7b17f03ecc4921ae2",
    measurementId: "G-4QP8TEWJZS"
};

firebase.initializeApp(firebaseConfig);
export default firebase;