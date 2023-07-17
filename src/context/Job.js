import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase_config";
import { useAuthContext } from "./Auth";


const JobContext = createContext();

export function JobContextProvider({ children }) {
	const [jobs, setJobs] = useState([])
	const { user } = useAuthContext()

	useEffect(() => {
		if (user) {
			const q = query(collection(db, "Job"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const jobs = [];
				querySnapshot.forEach((doc) => {
					jobs.push({ ...doc.data(), jobId: doc.id });
				});
				setJobs(jobs)
			});
			return () => {
				unsubscribe()
			}
		}
	}, [user])

	return (
		<JobContext.Provider value={{ jobs }}>
			{children}
		</JobContext.Provider>
	);
}

export function useJobContext() {
	return useContext(JobContext);
}
