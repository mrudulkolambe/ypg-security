import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { useAuthContext } from '../context/Auth'
import { useEmployeeContext } from '../context/Employee'
import { db, employeeAuth } from '../context/firebase_config'
import { useUtilsContext } from '../context/Utlis'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'
import Input from '../component/Input'
import Textarea from '../component/Textarea'

const AddEmployee = () => {
	const { addEmployee } = useEmployeeContext()
	const [uploadLoading, setUploadLoading] = useState(false)
	const { handleSignIn } = useAuthContext()
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
		profileimage: "",
		documentimage: "",
		address: "",
		status: "offline",
		carId: "",
		isJobAssigned: false
	}
	const [formData, setFormData] = useState(initialState);

	const handleFormData = (evt) => {
		setFormData({
			...formData,
			[evt.target.id]: evt.target.value
		});
	}

	const submitForm = () => {
		if (formData.confirmpassword === formData.password) {
			createUserWithEmailAndPassword(employeeAuth, formData.email, formData.password)
				.then(async (userCredential) => {
					const user = userCredential.user;
					const finalData = { ...formData };
					delete finalData.confirmpassword
					delete finalData.password
					await setDoc(doc(db, "Users", user.uid), finalData)
						.then(() => {
							setFormData(initialState)
						})
					setFormData(initialState)
				})
				.catch((error) => {

				});
		} else {
			alert("Enter Confirm Password same as Password.");
		}
	}

	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div className='flex justify-between items-center mb-3'>
						<h1 className='text-3xl font-bold'>Add Employees</h1>
						<Link to='/view-employee' className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>View Employee</Link>
					</div>
					<div className='w-full mb-16'>
						<div className='py-5 px-5 bg-white rounded-md shadow-md'>
							<p className='mb-3 font-bold text-lg'>Add Employee - General Info</p>
							<div className='grid grid-cols-2 gap-x-6 gap-y-3 text-sm mt-4'>
								<Input label={"First Name"} id={"firstname"} value={formData.firstname} onChange={handleFormData} type={"text"} />
								<Input label={"Last Name"} id={"lastname"} value={formData.lastname} onChange={handleFormData} type={"text"} />
								<Input label={"Email"} id={"email"} value={formData.email} onChange={handleFormData} type={"email"} />
								<Input label={"Username"} id={"username"} value={formData.username} onChange={handleFormData} type={"text"} message={"Allowed only letters, digits and @, +, -, _"} />
								<Input label={"Password"} id={"password"} value={formData.password} onChange={handleFormData} type={"password"} />
								<Input label={"Confirm Password"} id={"confirmpassword"} value={formData.confirmpassword} onChange={handleFormData} type={"password"} />
							</div>
						</div>
						<div className='py-5 px-5 bg-white rounded-md shadow-md mt-6'>
							<p className='mb-3 font-bold text-lg'>Personal Information</p>
							<div className='grid grid-cols-2 gap-x-6 gap-y-3 text-sm'>
								<Input label={"Phone Number"} id={"phonenumber"} value={formData.phonenumber} onChange={handleFormData} type={"number"} />
								<Input label={"Driving License"} id={"drivinglicense"} value={formData.drivinglicense} onChange={handleFormData} type={"text"} />
								<Input label={"Security License"} id={"securitylicense"} value={formData.securitylicense} onChange={handleFormData} type={"text"} />
								{/* <Input label={"Profile Picture"} id={"profileImage"} value={formData.profileImage} onChange={handleFormData} type={"file"} />
								<Input label={"Document Image"} id={"documentImage"} value={formData.documentImage} onChange={handleFormData} type={"file"} /> */}

								{/* <div>
									<label htmlFor="profileimage">Profile Picture: </label>
									<input onChange={(e) => { uploadMedia(e.target.files[0], `employee/${uuidv4()}`, formData, setFormData, setUploadLoading, 'profile_picture') }} type="file" className='rounded-md duration-200 focus:border-gray-500 w-full py-2 px-4 border-2 outline-none' name="profileimage" id="profileimage" />
								</div>
								<div>
									<label htmlFor="documentimage">Document Image: </label>
									<input onChange={(e) => { uploadMedia(e.target.files[0], `employee/${uuidv4()}`, formData, setFormData, setUploadLoading, 'document_image') }} type="file" className='rounded-md duration-200 focus:border-gray-500 w-full py-2 px-4 border-2 outline-none' name="documentimage" id="documentimage" />
								</div> */}
								<Textarea label={"Address"} id={"address"} value={formData.address} onChange={handleFormData} className='col-span-2' />
							</div>
							<button disabled={uploadLoading} onClick={submitForm} className='disabled:bg-indigo-300 disabled:cursor-not-allowed mt-4 bg-indigo-500 px-4 py-1.5 rounded-md text-white hover:bg-indigo-600 duration-300'>Save Employee</button>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default AddEmployee