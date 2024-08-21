import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB49GUjFt9LF1i6ju73_PTG-24czLW05_8",
  authDomain: "fir-with-context-5e5ac.firebaseapp.com",
  projectId: "fir-with-context-5e5ac",
  storageBucket: "fir-with-context-5e5ac.appspot.com",
  messagingSenderId: "482593256624",
  appId: "1:482593256624:web:d8a05b622ebe67cad93775",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
