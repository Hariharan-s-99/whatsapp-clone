 import firebase from "firebase"
 import {} from "dotenv/config";
 const firebaseConfig = {
   apiKey: process.env.API_KEY,
   authDomain: process.env.AUTH_DOMAIN,
   projectId: process.env.PROJECT_ID,
   storageBucket: process.env.STORAGE_BUCKET,
   messagingSenderId: process.env.MESSAGING_SENDER_ID,
   appId: process.env.APP_ID,
 };

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
export {auth,provider};
export default db;