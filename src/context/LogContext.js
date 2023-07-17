import { collection, onSnapshot, query } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "./firebase_config";
import { useAuthContext } from "./Auth";


const LogContext = createContext();

export const LogContextProvider = ({ children }) => {
	const [logs, setLogs] = useState([])
	const { user } = useAuthContext()
	useEffect(() => {
		if (user) {
			const q = query(collection(db, "log"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const logs = [];
				querySnapshot.forEach((doc) => {
					logs.push({ ...doc.data(), logId: doc.id });
				});
				setLogs(logs)
			});
			return () => {
				unsubscribe()
			}
		}
	}, [user])

	return <LogContext.Provider value={{ logs }}>
		{children}
	</LogContext.Provider>
}

export const UseLogContext = () => {
	return useContext(LogContext)
}