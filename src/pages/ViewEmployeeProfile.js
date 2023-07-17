import React, { useEffect, useState } from 'react'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Footer from '../component/Footer'
import { db } from '../context/firebase_config'
import { doc, onSnapshot } from 'firebase/firestore'

const ViewEmployeeProfile = () => {
	const { uid } = useParams();
	const [employeeData, setEmployeeData] = useState()

	useEffect(() => {
		if(uid){
			const unsub = onSnapshot(doc(db, "Users", uid), (doc) => {
				setEmployeeData(doc.data())
		});
			return () => {
				unsub()
			}
		}
	}, [uid])
	

	return (
		<>
			<Sidebar />
			<Topbar />

			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div>
						<h1 className='uppercase font-bold text-2xl'>Employee Profile</h1>
					</div>
					<div className='flex justify-end my-3'>
						<button className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>Add Employee</button>
					</div>
					<div className='w-full bg-white py-5 px-5 mb-16 flex'>
						<div className='w-3/12 h-auto'>
							<img className='h-52 w-52 rounded-full' src={employeeData && employeeData.profileimage} alt="" />
						</div>
						<div className='w-9/12 h-auto'>
							<h1 className='font-bold text-2xl'>Profile</h1>
							<div className='mt-6'>
								<div className='flex text-lg pb-4 border-b'>
									<p className='font-bold mr-2'>First Name: </p>
									<p className='text-gray-600'>{employeeData && employeeData.firstname}</p>
								</div>
								<div className='flex text-lg py-4 border-b'>
									<p className='font-bold mr-2'>Last Name: </p>
									<p className='text-gray-600'>{employeeData && employeeData.lastname}</p>
								</div>
								<div className='flex text-lg py-4 border-b'>
									<p className='font-bold mr-2'>Address: </p>
									<p className='text-gray-600'>{employeeData && employeeData.address}</p>
								</div>
								<div className='flex text-lg py-4 border-b'>
									<p className='font-bold mr-2'>Phone Number: </p>
									<p className='text-gray-600'>{employeeData && employeeData.phonenumber}</p>
								</div>
								<div className='flex text-lg py-4 border-b'>
									<p className='font-bold mr-2'>Driving License: </p>
									<p className='text-gray-600'>{employeeData && employeeData.drivinglicense}</p>
								</div>
								<div className='flex text-lg py-4 border-b'>
									<p className='font-bold mr-2'>Security License: </p>
									<p className='text-gray-600'>{employeeData && employeeData.securitylicense}</p>
								</div>
								<div className='text-lg py-4 border-b'>
									<p className='font-bold mr-2'>Documents: </p>
									<img className='h-72 w-72' src={employeeData && employeeData.documentimage} alt="" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default ViewEmployeeProfile