import firebase from '@firebase/app';
import '@firebase/firestore';
//import '@firebase/auth';

export const firebaseConfig = {
    apiKey: "AIzaSyBT3oSrnOeolwyqLkRYFdJ8Hvi8AbmKCSQ",
    authDomain: "cryptourls.firebaseapp.com",
    databaseURL: "https://cryptourls.firebaseio.com",
    projectId: "cryptourls",
    storageBucket: "cryptourls.appspot.com",
    messagingSenderId: "60373407434",
    appId: "1:60373407434:web:569808913f8339620e8633",
    measurementId: "G-BSZ0H8QQ45"
};

firebase.initializeApp(firebaseConfig);

export default firebase;