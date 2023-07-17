import React from 'react'
import Footer from '../component/Footer'
import HomepageDataTop from '../component/HomepageDataTop'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { useAlarmResponse } from '../context/AlarmResponse'
import { useAssetContext } from '../context/Asset'
import { useEmployeeContext } from '../context/Employee'
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api'
import { useUtilsContext } from '../context/Utlis'
import { useState, useEffect } from 'react'

const Home = () => {
	const { mapCenter } = useUtilsContext()
	const { employees } = useEmployeeContext()
	const { assets } = useAssetContext()
	const { alarmResponse } = useAlarmResponse();
	const { isLoaded } = useJsApiLoader({
		googleMapsApiKey: "AIzaSyA61bAP9s4HFWbQADMXcPUa6lGVSF0YCCE",
		libraries: ["places"]
	})
	const [markers, setMarkers] = useState([])
	const containerStyle = {
		height: "100%",
		width: "100%"
	}

	useEffect(() => {
		const markers = [];
		if (employees) {
			employees?.map((employee) => {
				if (employee?.lat && employee?.long) {
					markers.push({ lat: Number(employee?.lat), lng: Number(employee?.long), name: `${employee?.username}` })
				}
			})
			setMarkers(markers)
		}
	}, [employees]);
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='h-full w-full px-5 py-6'>
					<div className='grid grid-cols-3 gap-3'>
						<HomepageDataTop title={'Number Of Employee'} data={employees.length} icon={'users'} />
						<HomepageDataTop title={'Number Of Assets'} data={assets.length} icon={'cars'} />
						<HomepageDataTop title={'Total Alarm Response'} data={alarmResponse.length} icon={'assets'} />
					</div>
					<div className='grid grid-cols-1 gap-4 mt-4'>
						<div className='p-2 w-full h-[73vh] bg-white shadow-lg rounded-md'>
							{isLoaded ?
								<GoogleMap
									options={{
										disableDefaultUI: true,
										clickableIcons: false,
									}}
									mapContainerStyle={containerStyle}
									center={mapCenter}
									zoom={14}
								>
									{
										markers && markers?.map((marker) => {
											return <Marker label={marker?.name} title={marker?.name} position={marker} />
										})
									}
								</GoogleMap>
								: <div>Loading....</div>}
						</div>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default Home