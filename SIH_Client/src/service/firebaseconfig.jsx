import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCb2IBVvIeA_P319mfv0Refkzr__e7jAtM",
  authDomain: "chatbot-ticketing-system-92a08.firebaseapp.com",
  projectId: "chatbot-ticketing-system-92a08",
  storageBucket: "chatbot-ticketing-system-92a08.appspot.com",
  messagingSenderId: "149461740786",
  appId: "1:149461740786:web:b016d99acbea696000f46b",
  measurementId: "G-19NGYV5H6Y"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { auth, db, GoogleAuthProvider, signInWithPopup, signOut, doc, setDoc, app };