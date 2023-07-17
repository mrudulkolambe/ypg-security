import React, { useState, useEffect } from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { Marker, useJsApiLoader, GoogleMap, DirectionsRenderer } from '@react-google-maps/api'
import Select from '../component/Select'
import Input from '../component/Input'
import { useEmployeeContext } from '../context/Employee'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../context/firebase_config'
import { useUtilsContext } from '../context/Utlis'

const EmployeeTrack = () => {

	const { mapCenter } = useUtilsContext();
	const { employeeOption } = useEmployeeContext();
	const [option, setOption] = useState("");
	const [data, setData] = useState();
	const [date, setDate] = useState("");
	const [map, setMap] = useState(null)
	const [results, setResults] = useState();

	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyA61bAP9s4HFWbQADMXcPUa6lGVSF0YCCE",
		libraries: ["places"]
	})
	const center = {
		lat: 19.2403,
		lng: 73.1305
	}
	const containerStyle = {
		height: "79vh",
		width: "92vw"
	}
	const handleClick = (event) => {
		const newMarker = {
			lat: event.latLng.lat(),
			lng: event.latLng.lng()
		};
	};
	useEffect(() => {
		if (employeeOption) {
			setOption(employeeOption[0]?.value)
		}
	}, [employeeOption]);

	const handleSearch = async () => {
		onSnapshot(doc(db, "track", `${option}-${date}`), async (doc) => {
			setData(doc.data())
			if (doc.data()) {
				const coords = doc.data()?.coords;
				var waypts = [];
				// eslint-disable-next-line no-undef
				if (coords) {
					// eslint-disable-next-line no-undef
					const directionsService = new google.maps.DirectionsService()
					const results = await directionsService.route({
						// eslint-disable-next-line no-undef
						origin: new google.maps.LatLng(coords[0].lat, coords[0].lon),
						// eslint-disable-next-line no-undef
						destination: new google.maps.LatLng(coords[coords?.length - 1].lat, coords[coords?.length - 1].lon),
						// eslint-disable-next-line no-undef
						travelMode: google.maps.TravelMode.DRIVING,
						optimizeWaypoints: true,
						waypoints: waypts || []
					})
					setResults(results)
				}
			}
		});
	}

	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div className='flex justify-between items-center w-full'>
						<h1 className='text-3xl font-bold'>Employee Track</h1>
						<div className='flex items-center justify-center'>
							<Input placeholder={"02-06-2023"} value={date} onChange={(e) => { setDate(e.target.value) }} />
							<Select value={option} onChange={(e) => { setOption(e.target.value); }} options={employeeOption} className="w-64" />
							<button onClick={handleSearch} className='disabled:bg-indigo-300 bg-indigo-500 px-4 py-2 rounded-md text-white hover:bg-indigo-600 duration-300'>Submit</button>
						</div>
					</div>
					<div className='rounded-md shadow-md mt-3 bg-white p-3 w-full h-full flex justify-center'>
						{isLoaded ?
							<GoogleMap
								options={{
									disableDefaultUI: true,
									clickableIcons: true,
								}}
								mapContainerStyle={containerStyle}
								center={mapCenter}
								zoom={14}
								onLoad={(map) => { setMap(map) }}
							>
								{results && < DirectionsRenderer directions={results} />}
							</GoogleMap>
							: <div>Loading....</div>}
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default EmployeeTrack