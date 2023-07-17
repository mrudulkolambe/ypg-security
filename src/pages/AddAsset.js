import React, { useEffect, useState } from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { useAssetContext } from '../context/Asset'
import { useUtilsContext } from '../context/Utlis'
import { v4 as uuidv4 } from 'uuid';
import { collection, addDoc, query, onSnapshot } from "firebase/firestore";
import { db } from '../context/firebase_config'
import Input from '../component/Input'
import { Link } from 'react-router-dom'

const AddAsset = () => {

	const { addAssets } = useAssetContext();
	const { uploadMedia } = useUtilsContext()
	const [uploadLoading, setUploadLoading] = useState(false)

	const initialState = {
		carName: "",
		carModel: "",
		plateNumber: "",
		carImage: "img",
	}
	const [formData, setFormData] = useState(initialState);

	const handleChange = (evt) => {
		const value = evt.target.value;
		setFormData({
			...formData,
			[evt.target.id]: value
		});
	}

	const submitForm = async () => {
		const docRef = await addDoc(collection(db, "Asset"), formData)
			.then(() => {
				alert("Asset added")
			})
		setFormData(initialState)
	}

	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div className='flex justify-between items-center mb-3'>
						<h1 className='text-3xl font-bold'>Add Asset</h1>
						<Link to="/view-asset" className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>View Assets</Link>
					</div>
					<div className='w-full mb-16'>
						<div className='py-5 px-5 bg-white rounded-md shadow-md'>
							<p className='mb-3 font-bold text-lg'>Add Asset</p>
							<div className='grid grid-cols-2 gap-x-6 gap-y-3 text-sm mt-4'>
								<Input value={formData.carName} onChange={handleChange} label={"Car Name"} id={"carName"} type={"text"} />
								<Input value={formData.carModel} onChange={handleChange} label={"Car Model"} id={"carModel"} type={"text"} />
								<Input value={formData.plateNumber} onChange={handleChange} label={"Plate Number"} id={"plateNumber"} type={"text"} />
								{/* <Input value={formData.carImage} onChange={(e) => {}} label={"Car Image"} id={"carImage"} type={"file"}/> */}
							</div>
							<button disabled={uploadLoading} onClick={submitForm} className='disabled:bg-indigo-300 mt-3 bg-indigo-500 px-4 py-1.5 rounded-md text-white hover:bg-indigo-600 duration-300'>Save Asset</button>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default AddAsset

