import React, { useEffect, useState } from 'react'
import EmployeeRow from '../component/EmployeeRow'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import axios from 'axios'
import { useEmployeeContext } from '../context/Employee'
import { Link } from 'react-router-dom'

const ViewEmployee = () => {
	const { employees, setEmployees } = useEmployeeContext();
	const [searchResults, setSearchResults] = useState([])

	useEffect(() => {
		setSearchResults(employees);
	}, [employees]);

	const handleSearch = (evt) => {
		if (evt.target.value.length > 0) {
			const results = employees?.filter((employee) => {
				return employee?.firstname?.toLowerCase().includes(evt?.target?.value.toLowerCase()) || employee?.lastname?.toLowerCase().includes(evt?.target?.value.toLowerCase()) || employee?.username?.toLowerCase().includes(evt?.target?.value.toLowerCase()) || employee?.email?.toLowerCase().includes(evt?.target?.value.toLowerCase())
			});
			setSearchResults(results)
		} else {
			setSearchResults(employees)
		}
	}

	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div className='flex justify-between items-center mb-3'>
						<h1 className='font-bold text-3xl'>Employees</h1>
						<Link to="/add-employee" className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>Add Employee</Link>
					</div>
					<div className='w-full bg-white py-5 px-5 mb-16'>
						<div className='w-full flex justify-end mb-5 items-center'>
							<label htmlFor="filter" className='text-sm mr-3 text-gray-500'>Search: </label>
							<input onChange={handleSearch} id='filter' type="text" className='border rounded-md outline-none font-normal text-sm px-3 py-2' placeholder='Search...' />
						</div>
						<table className='w-full text-sm'>
							<tr className='w-full text-left border'>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Name</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Username</th>
								<th className='w-3/12 font-bold py-3 px-2 border-r'>Email</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Phone Number</th>
								<th className='w-3/12 font-bold py-3 px-2 border-r'>Driving Licence</th>
							</tr>
							{
								searchResults && searchResults.map((employee, i) => {
									return <EmployeeRow key={employee.employeeId} employees={employees} setEmployees={setEmployees} employee={employee} i={i} />
								})
							}
						</table>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default ViewEmployee