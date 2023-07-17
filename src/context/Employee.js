import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "./firebase_config";
import { useAuthContext } from "./Auth";


const EmployeeContext = createContext();

export function EmployeeContextProvider({ children }) {
	const [employees, setEmployees] = useState([])
	const { user } = useAuthContext()
	const [userData, setUserData] = useState()
	const navigate = useNavigate();
	const [employeeOption, setEmployeeOption] = useState([]);

	useEffect(() => {
		if (user) {
			const q = query(collection(db, "Users"));
			const unsubscribe = onSnapshot(q, (querySnapshot) => {
				const employees = [];
				querySnapshot.forEach((doc) => {
					if (doc.data()?.role !== "admin") {
						employees.push({ ...doc.data(), employeeId: doc.id });
					}
				});
				setEmployees(employees)
			});
			return () => {
				unsubscribe()
			}
		}
	}, [user])


	useEffect(() => {
		if (employees) {
			setEmployeeOption(employees?.map((employee) => {
				return {
					...employee,
					label: `${employee?.firstname} ${employee?.lastname} (${employee?.username})`,
					value: `${employee?.employeeId}`
				}
			}))
		}
	}, [employees]);

	const addEmployee = () => {

	}

	return (
		<EmployeeContext.Provider value={{ addEmployee, employees, setEmployees, employeeOption }}>
			{children}
		</EmployeeContext.Provider>
	);
}

export function useEmployeeContext() {
	return useContext(EmployeeContext);
}
