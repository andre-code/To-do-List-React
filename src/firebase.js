import firebase from 'firebase';
/* var config = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
};
firebase.initializeApp( config ); */

var config = {
  apiKey: "AIzaSyBfVSuvO0YJZv-_rkNZ-WZFM9Vf-cPdOlM",
  authDomain: "todolist-27393.firebaseapp.com",
  databaseURL: "https://todolist-27393.firebaseio.com",
  projectId: "todolist-27393",
  storageBucket: "todolist-27393.appspot.com",
  messagingSenderId: "817512633202"
};
firebase.initializeApp(config);

export default firebase;