import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCUvAHM98ug2iibtjNwGO9CYvcwYawM8uw",
  authDomain: "application-tracker-ef599.firebaseapp.com",
  projectId: "application-tracker-ef599",
  storageBucket: "application-tracker-ef599.appspot.com",
  messagingSenderId: "177700775749",
  appId: "1:177700775749:web:55c4ecb97492feb36d002c",
  measurementId: "G-Z2DS81YJJH"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);