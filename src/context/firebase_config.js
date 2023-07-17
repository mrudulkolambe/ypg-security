import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC9l0o8uPqeEinh9oOHKqc1GpBvspKCopE",
  authDomain: "ypg-project.firebaseapp.com",
  projectId: "ypg-project",
  storageBucket: "ypg-project.appspot.com",
  messagingSenderId: "250720052517",
  appId: "1:250720052517:web:a9d10b67e2f8e7731126cc",
  measurementId: "G-8P061RPELY"
};

const app = initializeApp(firebaseConfig, "main");
const employeeApp = initializeApp(firebaseConfig, "employee-instance");
export const auth = getAuth(app);
export const employeeAuth = getAuth(employeeApp);
export const db = getFirestore(app);
export const storage = getStorage(app);