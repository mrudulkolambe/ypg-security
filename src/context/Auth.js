import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { auth, db, employeeAuth } from "./firebase_config";
import { collection, doc, getDocs, increment, onSnapshot, orderBy, query, setDoc, updateDoc, where } from "firebase/firestore";


const AuthContext = createContext();

export function AuthContextProvider({ children }) {
	const [user, setUser] = useState()
	const [userData, setUserData] = useState()
	const [alert, setAlert] = useState("")
	const navigate = useNavigate()

	const handleSignOut = () => {
		signOut(auth).then(() => {
			setUser()
			window.location.reload()
		}).catch((error) => {
			// An error happened.
		});
	}

	const handleSignIn = async (email, password) => {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				onSnapshot(doc(db, "users", user.uid), (doc) => {
					user.role = doc.data().role
					if (user.role === "admin") {
						setUser(user)
						navigate("/")
					} else {
						handleSignOut()
					}
				});
			})
			.catch((error) => {
				console.log(error.message)
			});
	}

	useEffect(() => {
		onAuthStateChanged(auth, async (user) => {
			if (!user) {
				navigate('/login');
				console.log("no user")
			}else{
				setUser(user)
			}
		});
		onAuthStateChanged(employeeAuth, async (employee) => {
			if (!employee) {
				// navigate('/login');
				console.log("no employee")
			}else{
				console.log(employee)
			}
		});
	}, []);

	const handleSignUp = (email, password, name, phone) => {
		createUserWithEmailAndPassword(employeeAuth, email, password)
			.then((userCredential) => {
				const user = userCredential.user;
			})
			.catch((error) => {

			});
	}


	return (
		<AuthContext.Provider value={{ auth, handleSignIn, user, handleSignOut, handleSignUp, setUser, userData }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuthContext() {
	return useContext(AuthContext);
}
