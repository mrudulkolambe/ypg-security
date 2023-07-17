import React, { useEffect, useState } from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import {UseLogContext} from '../context/LogContext'

const ViewEmployeeAttendance = () => {
	const { logs } = UseLogContext()
	const [employeeLogs, setEmployeeLogs] = useState([])
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		const finalLogs = logs?.filter((log) => {
			return log?.type === "employee"
		})
		setEmployeeLogs(finalLogs);
	}, [logs])

	useEffect(() => {
		setSearchResult(employeeLogs)
	}, [employeeLogs])

	const handelSearch = (evt) => {
		if (evt.target.value > 0) {
			const result = employeeLogs?.filter((employeeLog) => {
				return employeeLog?.username?.toLowerCase().includes(evt.target.value.toLowerCase()) || employeeLog?.email?.toLowerCase().includes(evt.target.value.toLowerCase()) || employeeLog?.action?.toLowerCase().includes(evt.target.value.toLowerCase()) || employeeLog?.date?.toLowerCase().includes(evt.target.value.toLowerCase())
			})
			setSearchResult(result)
		}
		else {
			setSearchResult(employeeLogs)
		}
	}

	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div>
						<h1 className='font-bold text-3xl mb-3'>Employees</h1>
					</div>
					<div className='w-full bg-white py-5 px-5 mb-16'>
						<div className='w-full flex justify-end mb-5 items-center'>
							<label htmlFor="filter" className='text-sm mr-3 text-gray-500'>Search: </label>
							<input onChange={handelSearch} id='filter' type="text" className='border rounded-md outline-none font-normal text-sm px-3 py-2' placeholder='Search...' />
						</div>
						<table className='w-full text-sm'>
							<tr className='w-full text-left border'>
								<th className='w-3/12 font-bold py-3 px-2 border-r'>Username</th>
								<th className='w-3/12 font-bold py-3 px-2 border-r'>Email</th>
								<th className='w-3/12 font-bold py-3 px-2 border-r'>Action</th>
								<th className='w-3/12 font-bold py-3 px-2 border-r'>Date Time</th>
							</tr>
							{
								searchResult && searchResult.map((item) => {
									return <tr className='w-full text-left border'>
										<td className='w-3/12 font-light py-3 px-2 border-r'>{item?.username}</td>
										<td className='w-3/12 font-light py-3 px-2 border-r'>{item?.email}</td>
										<td className='w-3/12 font-light py-3 px-2 border-r'>{item?.action}</td>
										<td className='w-3/12 font-light py-3 px-2 border-r'>{item?.date}</td>
									</tr>
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

export default ViewEmployeeAttendance