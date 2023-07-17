import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import { useAuthContext } from "./Auth";
import { useState } from "react";
import { db } from "./firebase_config";
import { collection, onSnapshot, query } from "firebase/firestore";

const NotificationContext = createContext()

const NotificationContextProvider = ({ children }) => {
	const { user } = useAuthContext()
	const [notifications, setNotifications] = useState([])
	useEffect(() => {
		if (user) {
			const q = query(collection(db, "Notification"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const notification = [];
				querySnapshot.forEach((doc) => {
					notification.push({ ...doc.data(), docID: doc.id });
				});
				setNotifications(notification)
			});
			return () => {
				unsubscribe()
			};
		}
	}, [user]);
	
	return <NotificationContext.Provider value={{ notifications }}>
		{children}
	</NotificationContext.Provider>
}

const useNotificationContext = () => {
	return useContext(NotificationContext)
}

export { NotificationContextProvider, useNotificationContext }