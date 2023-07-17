import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../context/firebase_config'
import Input from '../component/Input'

const UpdateAsset = () => {
	const navigate = useNavigate()
	const { uid } = useParams()

	const initialState = {
		carName: "",
		carModel: "",
		plateNumber: "",
		carImage: "asdasdasd",
	}
	const [formData, setFormData] = useState(initialState);

	const handleChange = (evt) => {
		const value = evt.target.value;
		setFormData({
			...formData,
			[evt.target.id]: value
		});
	}

	useEffect(() => {
		if (uid) {
			const unsub = onSnapshot(doc(db, "Asset", uid), (doc) => {
				setFormData(doc.data())
			});
			return () => {
				unsub()
			}
		}
	}, [uid])

	const submitForm = async () => {
		const docRef = doc(db, "Asset", uid);
		await updateDoc(docRef, formData)
			.then((res) => {
				navigate('/view-asset');
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
						<h1 className='uppercase font-bold text-2xl'>Update Asset</h1>
					</div>
					<div className='flex justify-end my-3'>
						<Link to="/view-asset" className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>View Asset</Link>
					</div>
					<div className='w-full mb-16'>
						<div className='py-5 px-5 bg-white rounded-md shadow-md'>
							<p className='mb-3 font-bold text-lg'>Update Asset</p>
							<div className='grid grid-cols-2 gap-x-6 gap-y-3 text-sm mt-4'>
								<Input label={"Car Name"} value={formData.carName} onChange={handleChange} type={"text"} id={"carName"}/>
								<Input label={"Car Model"} value={formData.carModel} onChange={handleChange} type={"text"} id={"carModel"}/>
								<Input label={"Plate Number"} value={formData.plateNumber} onChange={handleChange} type={"text"} id={"plateNumber"}/>
								{/* <Input label={"Car Image"} value={formData.carName} onChange={handleChange} type={"file"} id={"carImage"}/> */}
								
								{/* <div>
									<label htmlFor="carImage">Car Image: </label>
									<input type="file" className='rounded-md duration-200 focus:border-gray-500 mt-2 w-full py-2 px-4 border-2 outline-none' name="carimage" id="carimage" />
									<p className='text-xs text-gray-500'>{'Choose <2MB image size'}</p>
								</div> */}
							</div>
							<button onClick={submitForm} className='mt-3 bg-indigo-500 px-4 py-1.5 rounded-md text-white hover:bg-indigo-600 duration-300'>Save Asset</button>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default UpdateAsset