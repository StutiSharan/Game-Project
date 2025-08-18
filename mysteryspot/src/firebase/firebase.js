// import { initializeApp } from "firebase/app";
// import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "YOUR_API_KEY",
//   authDomain: "YOUR_AUTH_DOMAIN",
//   projectId: "YOUR_PROJECT_ID",
//   storageBucket: "YOUR_STORAGE_BUCKET",
//   messagingSenderId: "YOUR_SENDER_ID",
//   appId: "YOUR_APP_ID"
// };

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyD_rK3SfEQ1LknPSD8f_gibyXBmo0hrrgI",
  authDomain: "game-project-a8094.firebaseapp.com",
  projectId: "game-project-a8094",
  storageBucket: "game-project-a8094.firebasestorage.app",
  messagingSenderId: "429071829765",
  appId: "1:429071829765:web:b6b0a590c645b5d4d2456c",
  measurementId: "G-ZX2SBG80NQ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
