import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { Link } from 'react-router-dom'
import { useJobContext } from '../context/Job'

const ViewJobs = () => {
	const {jobs} = useJobContext()
	const [searchReasult, setSearchReasult] = useState([])

	useEffect(() => {
		setSearchReasult(jobs)
	}, [jobs]);
	
	const handelSearch = (evt) => {
		if(evt.target.value.length > 0){
			const result = jobs?.filter((job) => {
				console.log(job)
				return job?.jobNo?.toLowerCase().includes(evt?.target?.value.toLowerCase()) || job?.clientName?.toLowerCase().includes(evt?.target?.value.toLowerCase()) || job?.address?.toLowerCase().includes(evt?.target?.value.toLowerCase())
			});
			setSearchReasult(result)
		}
		else{
			setSearchReasult(jobs)
		}
	}

	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div className='flex justify-between items-center mb-3'>
						<h1 className='font-bold text-3xl'>Jobs</h1>
						<Link to="/assign-jobs" className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>Assign Job</Link>
					</div>
					<div className='w-full bg-white py-5 px-5 mb-16 rounded-md shadow-md'>
						<div className='w-full flex justify-end mb-5 items-center'>
							<label htmlFor="filter" className='text-sm mr-3 text-gray-500'>Search: </label>
							<input onChange={handelSearch} id='filter' type="text" className='border rounded-md outline-none font-normal text-sm px-3 py-2' placeholder='Search...' /></div>
						<table className='w-full text-sm'>
							<tr className='w-full text-left border'>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Job No.</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Client Name</th>
								<th className='w-6/12 font-bold py-3 px-2 border-r'>Address</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Date time</th>
							</tr>
							{
								searchReasult && searchReasult.map((job, i) => {
									return <tr className={i % 2 === 0 ? 'w-full text-left border' : 'w-full text-left border bg-blue-50'}>
										<td className='w-2/12 font-light py-3 px-2 border-r'>{job.jobNo}</td>
										<td className='w-2/12 font-light py-3 px-2 border-r'>{job.clientName}</td>
										<td className='w-6/12 font-light py-3 px-2 border-r'>{job.address}</td>
										<td className='w-2/12 font-light py-3 px-2 border-r'>{job.timestamp}</td>
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

export default ViewJobs