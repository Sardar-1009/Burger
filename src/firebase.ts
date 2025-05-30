import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyCjmKdmAtIYlbL-9x71Uy7wEHqvOn6VpkY",
    authDomain: "burger-a9a2c.firebaseapp.com",
    databaseURL: "https://burger-a9a2c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "burger-a9a2c",
    storageBucket: "burger-a9a2c.firebasestorage.app",
    messagingSenderId: "717867726567",
    appId: "1:717867726567:web:9dbfeca1c150ce863dd442",
    measurementId: "G-BCYN9M95KP"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };