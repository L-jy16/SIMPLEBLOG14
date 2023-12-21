import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyC_LPZlIHeAhwFaH2ddnz2cVUkBCGCnS7E",
    authDomain: "react-blog-a2f40.firebaseapp.com",
    projectId: "react-blog-a2f40",
    storageBucket: "react-blog-a2f40.appspot.com",
    messagingSenderId: "580074425864",
    appId: "1:580074425864:web:145dce9def65104eedcbbd"
};

firebase.initializeApp(firebaseConfig);

export default firebase;