import firebase from '@firebase/app';
import '@firebase/firestore';

export const firebaseConfig = {
	apiKey: 'AIzaSyBT3oSrnOeolwyqLkRYFdJ8Hvi8AbmKCSQ',
	authDomain: 'cryptourls.firebaseapp.com',
	databaseURL: 'https://cryptourls.firebaseio.com',
	projectId: 'cryptourls',
	storageBucket: 'cryptourls.appspot.com',
	messagingSenderId: '60373407434',
	appId: '1:60373407434:web:569808913f8339620e8633',
	measurementId: 'G-BSZ0H8QQ45',
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().enablePersistence()
  .catch((error) => {
      if (error.code === 'failed-precondition') {
		alert('Multiple tabs open, persistence can only be enabled, in one tab at a time.');
      } else if (error.code === 'unimplemented') {
		alert('This browser does not support all of the features required to enable persistencee');
      }
  });

export const emailsCollection = firebase.firestore().collection('emails');

export default firebase;
