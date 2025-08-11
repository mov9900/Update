// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2-ZSnxGhMSbpxR9lWipQ-JX4s8Fz3j8Q",
  authDomain: "librarymanagement-80741.firebaseapp.com",
  projectId: "librarymanagement-80741",
  storageBucket: "librarymanagement-80741.firebasestorage.app",
  messagingSenderId: "7076696675",
  appId: "1:7076696675:web:ff0f1965ca544627ab1e56"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to Firebase services
const auth = firebase.auth();
const db = firebase.firestore(); 

