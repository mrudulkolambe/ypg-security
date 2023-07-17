import React, { useEffect, useState } from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../context/firebase_config'
import Input from '../component/Input'
import Textarea from '../component/Textarea'
import { useUtilsContext } from '../context/Utlis'

const UpdateEmployee = () => {

	const { uid } = useParams();
	const navigate = useNavigate();
	const [uploadLoading, setUploadLoading] = useState(false)
	const { uploadMedia } = useUtilsContext()

	const initialState = {
		firstname: "",
		lastname: "",
		email: "",
		username: "",
		password: "",
		confirmpassword: "",
		phonenumber: "",
		drivinglicense: "",
		securitylicense: "",
		profileimage: "asdasd",
		documentimage: "asdasd",
		address: ""
	}
	const [formData, setFormData] = useState(initialState)
	useEffect(() => {
		if (uid) {
			const unsub = onSnapshot(doc(db, "Users", uid), (doc) => {
				setFormData(doc.data())
			});
			return () => {
				unsub()
			}
		}
	}, [uid])

	const handleFormData = (evt) => {
		const value = evt.target.value;
		setFormData({
			...formData,
			[evt.target.id]: value
		});
	}

	const submitForm = async () => {
		const docRef = doc(db, "Users", uid);
		await updateDoc(docRef, formData)
			.then((res) => {
				navigate('/view-employee');
			})
			.catch((err) => {
				console.log(err.message);
			})
	}

	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div>
						<h1 className='uppercase font-bold text-2xl'>Update Employees</h1>
					</div>
					<div className='flex justify-end my-3'>
						<Link to="/view-employee" className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>View Employee</Link>
					</div>
					<div className='w-full mb-16'>
						<div className='py-5 px-5 bg-white rounded-md shadow-md'>
							<p className='mb-3 font-bold text-lg'>Update Employee - General Info</p>
							<div className='grid grid-cols-2 gap-x-6 gap-y-3 text-sm mt-4'>
								<Input label={"First Name"} id={"firstname"} value={formData.firstname} onChange={handleFormData} type={"text"} />
								<Input label={"Last Name"} id={"lastname"} value={formData.lastname} onChange={handleFormData} type={"text"} />
								<Input label={"Email"} id={"email"} value={formData.email} onChange={handleFormData} type={"email"} />
								<Input label={"Username"} id={"username"} value={formData.username} onChange={handleFormData} type={"text"} />

								{/* <div>
									<label htmlFor="username">Username: </label>
									<input value={formData.username} onChange={handleFormData} type="text" className='rounded-md duration-200 focus:border-gray-500 mt-2 w-full py-2 px-4 border-2 outline-none' name="username" id="username" />
									<p className='text-xs text-gray-500'>Allowed only letters, digits and @, +, -, _</p>
								</div> */}
							</div>
						</div>
						<div className='py-5 px-5 bg-white rounded-md shadow-md mt-6'>
							<p className='mb-3 font-bold text-lg'>Personal Information</p>
							<div className='grid grid-cols-2 gap-x-6 gap-y-3 text-sm'>
								<Input label={"Phone Number"} id={"phonenumber"} value={formData.phonenumber} onChange={handleFormData} type={"number"} />
								<Input label={"Driving License"} id={"drivinglicense"} value={formData.drivinglicense} onChange={handleFormData} type={"text"} />
								<Input label={"Security License"} id={"securitylicense"} value={formData.securitylicense} onChange={handleFormData} type={"text"} />
								{/* <Input label={"Profile Picture"} id={"profileimage"} value={formData.profileimage} onChange={handleFormData} type={"file"} />
								<Input label={"Document Image"} id={"documentimage"} value={formData.documentimage} onChange={handleFormData} type={"file"} /> */}
								<div>
									<label htmlFor="profileimage">Profile Picture: </label>
									<input onChange={(e) => { uploadMedia(e.target.files[0], `employee/${uid}/dp`, formData, setFormData, setUploadLoading, 'profile_picture') }} type="file" className='rounded-md duration-200 focus:border-gray-500 w-full py-2 px-4 border-2 outline-none' name="profileimage" id="profileimage" />
								</div>
								<div>
									<label htmlFor="documentimage">Document Image: </label>
									<input onChange={(e) => { uploadMedia(e.target.files[0], `employee/${uid}/docImg`, formData, setFormData, setUploadLoading, 'document_image') }} type="file" className='rounded-md duration-200 focus:border-gray-500 w-full py-2 px-4 border-2 outline-none' name="documentimage" id="documentimage" />
								</div>
								{/* <div>
									<label htmlFor="profileimage">Profile Picture: </label>
									<input type="file" className='rounded-md duration-200 focus:border-gray-500 mt-2 w-full py-2 px-4 border-2 outline-none' name="profileimage" id="profileimage" />
								</div>
								<div>
									<label htmlFor="documentimage">Document Image: </label>
									<input type="file" className='rounded-md duration-200 focus:border-gray-500 mt-2 w-full py-2 px-4 border-2 outline-none' name="documentimage" id="documentimage" />
								</div> */}
								<Textarea label={"Address"} id={"address"} value={formData.address} onChange={handleFormData} className='col-span-2' />
							</div>
							<button onClick={submitForm} className='mt-4 bg-indigo-500 px-4 py-1.5 rounded-md text-white hover:bg-indigo-600 duration-300'>Save Employee</button>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default UpdateEmployee