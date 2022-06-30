// const firebase = require("firebase");
// // Required for side-effects
// // require("firebase/firestore");
// let firebaseConfig = {
 
// };

// // // Initialize Firebase
// firebase.initializeApp(firebaseConfig);
  
// let db = firebase.firestore();




// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyAamRfpTudLqF-LZi7fK4LibNuSqDE8p8E",
  authDomain: "c23-blogs.firebaseapp.com",
  projectId: "c23-blogs",
  storageBucket: "c23-blogs.appspot.com",
  messagingSenderId: "703647952217",
  appId: "1:703647952217:web:949607d82c769ae5bbb048"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
let db = firebase.firestore();
let auth = firebase.auth();
// 
const logoutUser = () => {
  auth.signOut();
  location.reload();
}