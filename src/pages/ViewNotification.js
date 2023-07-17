import React from 'react'
import Topbar from '../component/Topbar'
import Sidebar from '../component/Sidebar'
import { Link } from 'react-router-dom'
import Footer from '../component/Footer'
import { useNotificationContext } from "../context/Notification"
import moment from 'moment'

const ViewNotification = () => {
	const { notifications } = useNotificationContext()
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div className='flex justify-between items-center mb-3'>
						<h1 className='text-3xl font-bold'>View Notification</h1>
						<Link to='/notification' className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>Add Notification</Link>
					</div>
					<div className='w-full mb-16'>
						<div className='py-5 px-5 bg-white rounded-md shadow-md'>
							<div className='w-full bg-white py-5 px-5 mb-16'>
								<table className='w-full text-sm'>
									<tr className='w-full text-left border'>
										<th className='font-bold py-3 px-2 border-r'>Target</th>
										<th className='font-bold py-3 px-2 border-r'>Title</th>
										<th className='font-bold py-3 px-2 border-r'>Description</th>
										<th className='font-bold py-3 px-2 border-r'>Date</th>
										<th className='font-bold py-3 px-2 border-r'>Timestamp</th>
									</tr>
									{
										notifications?.map((notification, i) => {
											return <tr key={notification?.docID} className={i % 2 === 0 ? 'w-full text-left border' : 'w-full text-left border bg-blue-100 bg-opacity-70'
											}>
												<td className='py-3 px-2 border-r'>{notification?.target}</td>
												<td className='py-3 px-2 border-r'>{notification?.title}</td>
												<td className='py-3 px-2 border-r'>{notification?.description}</td>
												<td className='py-3 px-2 border-r'>{notification?.date}</td>
												<td className='py-3 px-2 border-r'>{moment(notification?.timestamp).fromNow()}</td>
											</tr>
										})
									}
								</table>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default ViewNotification
