const firebaseConfig = {
    apiKey: "AIzaSyBQpv-IxnDrqXbQK94R3KK0xZT6SDlfXj0",
    authDomain: "happy-family-invoicer-a6530.firebaseapp.com",
    projectId: "happy-family-invoicer-a6530",
    storageBucket: "happy-family-invoicer-a6530.firebasestorage.app",
    messagingSenderId: "712054800583",
    appId: "1:712054800583:web:1aa86ed0e78a94000b3ee2"
  };

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();