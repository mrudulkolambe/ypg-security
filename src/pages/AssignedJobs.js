import React, { useEffect, useState } from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { UseLogContext } from '../context/LogContext'

const AssignedJobs = () => {
	const { logs } = UseLogContext()
	const [jobLogs, setJobLogs] = useState([])
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		const finalLogs = logs?.filter((log) => {
			return log?.type === "job"
		})
		setJobLogs(finalLogs);
	}, [logs])

	useEffect(() => {
		setSearchResult(jobLogs)
	}, [jobLogs])

	const handelSearch = (evt) => {
		if (evt.target.value > 0) {
			const result = jobLogs?.filter((jobLog) => {
				return jobLog?.jobNo?.toLowerCase().includes(evt.target.value.toLowerCase()) || jobLog?.userID?.toLowerCase().includes(evt.target.value.toLowerCase()) || jobLog?.assignedType?.toLowerCase().includes(evt.target.value.toLowerCase()) || jobLog?.action?.toLowerCase().includes(evt.target.value.toLowerCase()) || jobLog?.date?.toLowerCase().includes(evt.target.value.toLowerCase())
			})
			setSearchResult(result)
		}
		else {
			setSearchResult(jobLogs)
		}
	}

	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div>
						<h1 className='font-bold text-3xl mb-3'>View Jobs Assigned Logs</h1>
					</div>
					<div className='w-full bg-white py-5 px-5 mb-16'>
						<div className='w-full flex justify-end mb-5 items-center'>
							<label htmlFor="filter" className='text-sm mr-3 text-gray-500'>Search: </label>
							<input onChange={handelSearch} id='filter' type="text" className='border rounded-md outline-none font-normal text-sm px-3 py-2' placeholder='Search...' />
						</div>
						<table className='w-full text-sm'>
							<tr className='w-full text-left border'>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Job No.</th>
								<th className='w-3/12 font-bold py-3 px-2 border-r'>Employee</th>
								<th className='w-3/12 font-bold py-3 px-2 border-r'>Assigned Type</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Status</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Date Time</th>
							</tr>
							{
								searchResult && searchResult.map((item) => {
									return <tr className='w-full text-left border'>
										<td className='w-2/12 font-light py-3 px-2 border-r'>{item?.jobNo}</td>
										<td className='w-3/12 font-light py-3 px-2 border-r'>{item?.userID}</td>
										<td className='w-3/12 font-light py-3 px-2 border-r'>{item?.assignedType}</td>
										<td className='w-2/12 font-light py-3 px-2 border-r'>{item?.action}</td>
										<td className='w-2/12 font-light py-3 px-2 border-r'>{item?.date}</td>
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

export default AssignedJobs