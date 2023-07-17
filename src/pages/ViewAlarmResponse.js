import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import moment from 'moment'
import { useAlarmResponse } from '../context/AlarmResponse'
import { IoClose } from 'react-icons/io5'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const ViewAlarmResponse = () => {
	const { alarmResponse } = useAlarmResponse()
	const [showModal, setShowModal] = useState({ show: false, data: undefined })

	const [searchResult, setSearchResult] = useState([])
	useEffect(() => {
		setSearchResult(alarmResponse)
	}, [alarmResponse])

	const handelSearch = (evt) => {
		const result = alarmResponse.filter((report) => {
			return report.jobId.toLowerCase().includes(evt.target.value.toLowerCase()) || report.description.toLowerCase().includes(evt.target.value.toLowerCase()) || report.bureau.toLowerCase().includes(evt.target.value.toLowerCase()) || report.userId.toLowerCase().includes(evt.target.value.toLowerCase()) || report.notes.toLowerCase().includes(evt.target.value.toLowerCase())
		})
		setSearchResult(result)
	}

	return (
		<>
			<Sidebar />
			<Topbar />
			<div className={!showModal.show ? "fixed top-0 left-0 z-[1000] bg-black bg-opacity-50 h-screen w-screen duration-200 opacity-0 pointer-events-none" : "fixed top-0 left-0 z-[1000] bg-black bg-opacity-50 h-screen w-screen duration-200 opacity-100"}></div>
			<div className={showModal.show ? "h-[70vh] w-[50vw] flex flex-col px-8 p-5 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] rounded-lg  opacity-100 duration-200" : "h-[40vh] w-[60vw] flex flex-col px-8 p-5 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] rounded-lg opacity-0 pointer-events-none duration-200"}>
				<div className="flex justify-between items-center border-b pb-3">
					<h1 className="font-bold text-2xl">Images</h1>
					<span onClick={() => { setShowModal({ show: false, data: undefined }) }} className="p-1 rounded-md bg-indigo-500 text-white cursor-pointer"><IoClose className="cursor-pointer" /></span>
				</div>
				<div className="mt-4">
					<Swiper
						spaceBetween={50}
						slidesPerView={1}
					>
						{
							showModal?.data?.images?.map((image) => {
								return <SwiperSlide className='flex justify-center'>
									<img className='m-auto w-[20vw]' src={image} alt="" />
								</SwiperSlide>
							})
						}
					</Swiper>
				</div>
				<div className='w-full flex justify-center mt-2'>
				<h1 className='text-xl font-bold'>{showModal?.data?.images?.length}</h1>
				</div>
			</div>
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div className='mb-3'>
						<h1 className='font-bold text-3xl'>Alarm Response</h1>
					</div>
					<div className='w-full bg-white py-5 px-5 mb-16 shadow-md rounded-md'>
						<div className='w-full flex justify-end mb-5 items-center'>
							<label htmlFor="filter" className='text-sm mr-3 text-gray-500'>Search: </label>
							<input onChange={handelSearch} id='filter' type="text" className='border rounded-md outline-none font-normal text-sm px-3 py-2' placeholder='Search...' />
						</div>
						<table className='w-full text-sm'>
							<tr className='w-full text-left border'>
								<th className=' font-bold py-3 px-2 border-r'>Job No.</th>
								<th className=' font-bold py-3 px-2 border-r'>Description</th>
								<th className=' font-bold py-3 px-2 border-r'>Employee Id</th>
								<th className=' font-bold py-3 px-2 border-r'>Bureau</th>
								<th className=' font-bold py-3 px-2 border-r'>Attendance Notes</th>
								<th className=' font-bold py-3 px-2 border-r'>Date Time</th>
								<th className=' font-bold py-3 px-2 border-r'>Images</th>
							</tr>
							{
								searchResult && searchResult.map((item) => {
									return <tr key={item?.dataID} className='w-full text-left border'>
										<td className='py-3 px-2 border-r' title={item?.jobId}>{item?.jobId}</td>
										<td className='py-3 px-2 border-r' title={item?.description}>{item?.description}</td>
										<td className='py-3 px-2 border-r' title={item?.userId}>{item?.userId}</td>
										<td className='py-3 px-2 border-r' title={item?.bureau}>{item?.bureau}</td>
										<td className='py-3 px-2 border-r' title={item?.notes}>{item?.notes}</td>
										<td className='py-3 px-2 border-r'>{moment(item?.timestamp).format('ddd Do MMM YYYY')}</td>
										<td className='flex justify-center py-3 px-2 border-r'>
											<button onClick={() => { setShowModal({ show: true, data: item }) }} className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>View</button>
										</td>
									</tr>
								})
							}

						</table>
						<p className='hidden font-bold text-sm text-gray-500 mt-4'>Showing 0 to 0 of 0 entries</p>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default ViewAlarmResponse