import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase_config";
import { useAuthContext } from "./Auth";


const AlarmResponse = createContext();

export function AlarmResponseProvider({ children }) {
	const [alarmResponse, setAlarmResponse] = useState([])
	const { user } = useAuthContext()

	useEffect(() => {
		if (user) {
			const q = query(collection(db, "Report"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const alarmResponse = [];
				querySnapshot.forEach((doc) => {
					alarmResponse.push({ ...doc.data(), dataID: doc.id });
				});
				setAlarmResponse(alarmResponse)
			});
			return () => {
				unsubscribe()
			}
		}
	}, [user]);

	const addAlarmResponse = (data) => {
	}


	return (
		<AlarmResponse.Provider value={{ alarmResponse, addAlarmResponse }}>
			{children}
		</AlarmResponse.Provider>
	);
}

export function useAlarmResponse() {
	return useContext(AlarmResponse);
}
