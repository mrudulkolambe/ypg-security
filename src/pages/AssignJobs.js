import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";
import React from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { useState } from 'react'
import moment from 'moment'
import axios from 'axios'
import Clock from '../component/Clock'
import { Link } from 'react-router-dom'
import Input from '../component/Input'
import Select from '../component/Select'
import Textarea from '../component/Textarea'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../context/firebase_config'
import Alert from '../component/Alert'
import MapContainer from '../component/Map'
import { useEmployeeContext } from '../context/Employee'
import { useJobContext } from '../context/Job'
import { useEffect } from "react";
import { IoClose } from 'react-icons/io5'
import { useUtilsContext } from "../context/Utlis";

const AssignJobs = () => {
	const [marker, setMarker] = useState(null);
	const { jobs } = useJobContext()
	const { mapCenter } = useUtilsContext()
	const [markers, setMarkers] = useState([])
	const { employees } = useEmployeeContext();
	const [showModal, setShowModal] = useState({ show: false, data: undefined })
	const [loading, setLoading] = useState(false)
	const [assignLoading, setAssignLoading] = useState(false)
	const [jobID, setJobID] = useState("")
	const initialState = {
		address: "",
		task: "",
		jobNo: "",
		zone: "",
		clientName: "",
		clientPhoneNumber: "",
		remark: "new",
		timestamp: moment().format('llll')
	}

	useEffect(() => {
		const markers = [];
		if (employees && marker) {
			employees?.map((employee) => {
				if (employee?.lat && employee?.long) {
					markers.push({ lat: Number(employee?.lat), lng: Number(employee?.long) })
				}
			})
			setMarkers(markers)
		}
	}, [employees]);

	const [formData, setFormData] = useState(initialState)
	const handleFormData = (evt) => {
		const value = evt.target.value;
		setFormData({
			...formData,
			[evt.target.id]: value
		});
	}

	const submitForm = async () => {
		if (marker) {
			setLoading(true)
			const docRef = await addDoc(collection(db, "Job"), { ...formData, latitude: marker?.lat, longitude: marker?.lng })
				.then(() => {
					alert("Job assigned")
					setLoading(false)
				})
			setFormData(initialState)
			setMarker(null)
		} else {
			alert("Please mark the co-ordinates")
		}
	}

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyA61bAP9s4HFWbQADMXcPUa6lGVSF0YCCE",
		libraries: ["places"]
	})
	const containerStyle = {
		height: "100%",
		width: "100%"
	}
	const handleClick = (event) => {
		const newMarker = {
			lat: event.latLng.lat(),
			lng: event.latLng.lng()
		};
		setMarker(newMarker);
	};

	const handleAssignJob = () => {
		if (jobID) {
			setAssignLoading(true)
			const jobRef = doc(db, "Job", jobID);
			updateDoc(jobRef, {
				userID: showModal?.data?.employeeId
			})
			.then(() => {
				const userRef = doc(db, "Users", showModal?.data?.employeeId);
				updateDoc(userRef, {
					isJobAssigned: true
				})
				.then(() => {
					alert(`Job Assigned to ${showModal?.data?.username}`);
					setShowModal({show: false, data: undefined})
					setAssignLoading(false)
				})
			})
		}
	}


	return (
		<>
			<Sidebar />
			<Topbar />
			<div className={!showModal.show ? "fixed top-0 left-0 z-[1000] bg-black bg-opacity-50 h-screen w-screen duration-200 opacity-0 pointer-events-none" : "fixed top-0 left-0 z-[1000] bg-black bg-opacity-50 h-screen w-screen duration-200 opacity-100"}></div>
			<div className={showModal.show ? "h-[70vh] w-[50vw] flex flex-col px-8 p-5 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] rounded-lg  opacity-100 duration-200" : "h-[40vh] w-[60vw] flex flex-col px-8 p-5 bg-white fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] rounded-lg opacity-0 pointer-events-none duration-200"}>
				<div className="flex justify-between items-center border-b pb-3">
					<h1 className="font-bold text-2xl">Assign Job</h1>
					<span onClick={() => { setShowModal({ show: false, data: undefined }) }} className="p-1 rounded-md bg-indigo-500 text-white cursor-pointer"><IoClose className="cursor-pointer" /></span>
				</div>
				<div className="mt-4 grid grid-cols-1 gap-x-6 gap-y-3">
					<Input value={showModal?.data?.username} readOnly={true} label={"Username"} />
					<Input value={`${showModal?.data?.firstname} ${showModal?.data?.lastname}`} readOnly={true} label={"Name"} />
					<Input value={showModal?.data?.carId} readOnly={true} label={"Asset ID"} />
					<Input value={showModal?.data?.employeeId} readOnly={true} label={"User ID"} />
					<Select defaultOption={true} onChange={(e) => { setJobID(e.target.value) }} label={"Jobs"} options={jobs?.filter((job) => { return job.remark == "new" }).map((job) => { return { label: `${job?.jobNo} (${job?.clientName})`, value: job.jobId } })} />
					<button disabled={assignLoading} onClick={handleAssignJob} className='disabled:bg-indigo-400 disabled:cursor-not-allowed bg-indigo-500 px-4 py-1.5 rounded-md text-white hover:bg-indigo-600 duration-300'>Assign</button>
				</div>
			</div>
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div>
						<button onClick={() => { window.location.reload() }} className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>Reload Page</button>
					</div>
					<div className='flex justify-end my-3'>
						<Link to="/view-jobs" className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>View Jobs</Link>
					</div>
					<div className='font-bold text-2xl mb-2 flex'>JOB ASSIGN -&nbsp;{<Clock />}</div>
					<div className='w-full mb-16 flex gap-5 h-full'>
						<div className='w-7/12'>
							<div className='aspect-video bg-white shadow-md rounded-md p-2 h-max'>
								{isLoaded ?
									<GoogleMap
										onClick={handleClick}
										options={{
											disableDefaultUI: true,
											clickableIcons: false,
										}}
										mapContainerStyle={containerStyle}
										center={mapCenter}
										zoom={14}
									>
										{marker && <Marker position={marker} />}
										{
											markers && markers?.map((marker) => {
												return <Marker position={marker} />
											})
										}
									</GoogleMap>
									: <div>Loading....</div>}
							</div>
							<div className='flex mt-2'>
								<span className='font-bold mr-2'>Target: </span>
								<p className='mr-2'>Current Lat: </p>
								<p>Current Lng: </p>
							</div>
							<div className='mt-3'>
								<h1 className='font-bold text-xl'>Employee Status</h1>
								<table className='w-full text-sm my-2 rounded-md overflow-hidden shadow-md'>
									<tr className='bg-white rounded-sm shadow-md border-b'>
										<th className=' py-2 px-2'>Username</th>
										<th className=' py-2 px-2'>Latitude</th>
										<th className=' py-2 px-2'>Longitude</th>
										{/* <th className=' py-2 px-2'>Distance</th> */}
										<th className=' py-2 px-2'>Status</th>
										<th className=' py-2 px-2'>Manual Assign</th>
									</tr>
									{
										employees?.map((employee) => {
											return <tr className={employee?.isJobAssigned ? 'mt-3 text-center bg-red-100 rounded-sm shadow-md' : 'mt-3 text-center bg-green-100 rounded-sm shadow-md'}>
												<td className='text-gray-500 py-2 px-2'>{employee?.username}</td>
												<td className='text-gray-500 py-2 px-2'>{employee?.lat}</td>
												<td className='text-gray-500 py-2 px-2'>{employee?.long}</td>
												{/* <td className='text-gray-500 py-2 px-2'>Distance</td> */}
												<td className='text-gray-500 py-2 px-2'>{employee?.status}</td>
												<td onClick={() => {
													if (!employee?.isJobAssigned) {
														setShowModal({ show: true, data: employee })
													}
												}} className='text-gray-500 py-2 px-2'>Manual Assign</td>
											</tr>
										})
									}
								</table>
							</div>
						</div>
						<div className='w-5/12 bg-white p-4 flex flex-col gap-y-2 shadow-md rounded-md text-sm'>
							<Input label={"Task"} onChange={handleFormData} id={"task"} type={"text"} value={formData.task} placeholder={"Enter a task"} />
							<Textarea label={"Address"} id={"address"} value={formData.address} onChange={handleFormData} />
							<Input label={"Job No."} onChange={handleFormData} id={"jobNo"} type={"text"} value={formData.jobNo} />
							<Input label={"Zone"} onChange={handleFormData} id={"zone"} type={"text"} value={formData.zone} />
							<div className='grid grid-cols-2 gap-x-5'>
								<Input label={"Latitude"} id={"lat"} type={"number"} value={marker?.lat} />
								<Input label={"Longitude"} id={"lng"} type={"number"} value={marker?.lng} />
							</div>
							<Input label={"Client Name"} onChange={handleFormData} id={"clientName"} type={"text"} value={formData.clientName} />
							<Input label={"Client Phone Number"} onChange={handleFormData} id={"clientPhoneNumber"} type={"text"} value={formData.clientPhoneNumber} />
							<Input label={"Remark"} onChange={handleFormData} id={"remark"} type={"text"} value={formData.remark} />
							<button disabled={loading} type='button' onClick={submitForm} className='disabled:cursor-not-allowed disabled:bg-indigo-400 mt-3 bg-indigo-500 px-4 py-1.5 rounded-md text-white hover:bg-indigo-600 duration-300'>Save Job</button>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default AssignJobs