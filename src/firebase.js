import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyB0GWkZnrigp3s0xtUVl1Cn_7gMzReui_U",
    authDomain: "whatsapp-clone-28b6f.firebaseapp.com",
    projectId: "whatsapp-clone-28b6f",
    storageBucket: "whatsapp-clone-28b6f.appspot.com",
    messagingSenderId: "190328939390",
    appId: "1:190328939390:web:85322f95a7403b9845492f",
    measurementId: "G-F8F79RRWW7"
  };
  
  const firebaseApp= firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const provider = new firebase.auth.GoogleAuthProvider();
  
  export {auth,provider};
  export default db;