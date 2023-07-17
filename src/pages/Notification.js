import React from 'react'
import Topbar from '../component/Topbar'
import Sidebar from '../component/Sidebar'
import Input from '../component/Input'
import Select from '../component/Select'
import { useEmployeeContext } from '../context/Employee'
import { useState } from 'react'
import Footer from '../component/Footer'
import { Link } from 'react-router-dom'
import Textarea from '../component/Textarea'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../context/firebase_config'
import { useEffect } from 'react'

const Notification = () => {

	const { employees, employeeOption } = useEmployeeContext()
	const [options, setOptions] = useState([])

	const initialState = {
		title: "",
		description: "",
		target: "",
	}

	const [formData, setFormData] = useState(initialState);
	useEffect(() => {
		if (employees) {
			let optionNew = []
			optionNew = employees?.map((employee) => {
				return {
					...employee,
					label: `${employee?.username}`,
					value: `${employee?.employeeId}`
				}
			})
			optionNew.push({ label: "All", value: "all" })
			setOptions(optionNew.reverse())
		}
	}, [employees]);
	const handleFormData = (evt) => {
		setFormData({
			...formData,
			[evt.target.id]: evt.target.value
		});
	}

	const handleClick = () => {
		const dateObj = new Date();
		const dateString = `${dateObj.getDate() > 9 ? dateObj.getDate() : `0${dateObj.getDate()}`}-${dateObj.getMonth() + 1 > 9 ? dateObj.getMonth() + 1 : `0${dateObj.getMonth() + 1}`}-${dateObj.getFullYear()}`
		const docRef = addDoc(collection(db, "Notification"), { ...formData, date: dateString, timestamp: Date.now() })
			.then(() => {
				alert("Notification Sent!")
				setFormData(initialState)
			})
	}
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div className='flex justify-between items-center mb-3'>
						<h1 className='text-3xl font-bold'>Add Notification</h1>
						<Link to='/view-notification' className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>View Notification</Link>
					</div>
					<div className='w-full mb-16'>
						<div className='py-5 px-5 bg-white rounded-md shadow-md'>
							<div className='grid grid-cols-1 gap-x-6 gap-y-3 text-sm mt-4'>
								<Select label={"Target"} id={"target"} value={formData.target} onChange={handleFormData} options={options} />
								<Input label={"Title"} id={"title"} value={formData.title} onChange={handleFormData} type={"text"} />
								<Textarea label={"Description"} id={"description"} value={formData.description} onChange={handleFormData} type={"text"} />
								<button onClick={handleClick} className='disabled:bg-indigo-300 disabled:cursor-not-allowed mt-4 bg-indigo-500 px-4 py-1.5 rounded-md text-white hover:bg-indigo-600 duration-300'>Save Notification</button>
							</div>
						</div>
					</div>

				</div>
				<Footer />
			</div>
		</>
	)
}

export default Notification
