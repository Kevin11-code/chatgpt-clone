import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBjV9SvpL7jhV8asc786L5082V-kgR_pZk",
  authDomain: "chatgpt-clone-2c452.firebaseapp.com",
  projectId: "chatgpt-clone-2c452",
  storageBucket: "chatgpt-clone-2c452.appspot.com",
  messagingSenderId: "991116377814",
  appId: "1:991116377814:web:1d12ef72fd1a66a3ce1377",
  measurementId: "G-KKJ09F3DXC",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
