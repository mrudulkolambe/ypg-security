import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import moment from 'moment'
import { UseLogContext } from '../context/LogContext'

const ActivityLogs = () => {

	const { logs } = UseLogContext();
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		setSearchResult(logs)
	}, [logs])



	const handelSearch = (evt) => {
		const result = logs.filter((log) => {
			return log?.action?.toLowerCase().includes(evt.target.value.toLowerCase()) || log?.jobNo?.toLowerCase().includes(evt.target.value.toLowerCase()) || log?.name?.toLowerCase().includes(evt.target.value.toLowerCase()) || log?.email?.toLowerCase().includes(evt.target.value.toLowerCase()) || log?.username?.toLowerCase().includes(evt.target.value.toLowerCase()) || log?.type?.toLowerCase().includes(evt.target.value.toLowerCase())
		})
		setSearchResult(result)
	}

	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div>
						<h1 className='font-bold text-3xl mb-3'>Activity Logs</h1>
					</div>
					<div className='w-full bg-white py-5 px-5 mb-16'>
						<div className='w-full flex justify-end mb-5 items-center'><label htmlFor="filter" className='text-sm mr-3 text-gray-500'>Search: </label><input id='filter' onChange={handelSearch} type="text" className='border rounded-md outline-none font-normal text-sm px-3 py-2' placeholder='Search...' /></div>
						<table className='w-full text-sm'>
							<tr className='w-full text-left border'>
								<th className='w-6/12 font-bold py-3 px-2 border-r'>Log Description</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Time Ago</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Date Time</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Status</th>
							</tr>
							{
								searchResult && searchResult?.map((res) => {
									return <tr key={res?.logId} className='w-full text-left border'>
										<td className='w-6/12 font-semibold text-gray-800 py-3 px-2 border-r'>{res?.type?.toUpperCase()} {res?.type === "employee" ? `( ${res.userID} )` : `( ${res.jobNo} )`}</td>
										<td className='w-2/12 font-semibold text-gray-800 py-3 px-2 border-r'>{moment(res.timestamp).fromNow()}</td>
										<td className='w-2/12 font-semibold text-gray-800 py-3 px-2 border-r'>{moment(res.timestamp).format('ddd DD-MMM-YYYY, hh:mm A')}</td>
										<td className='w-2/12 font-semibold text-gray-800 py-3 px-2 border-r'>{res?.action}</td>
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

export default ActivityLogs