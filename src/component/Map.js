import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const MapContainer = ({ marker, setMarker }) => {
	
	return (
		<>
			{/* {isLoaded ?
				<GoogleMap
					onClick={handleClick}
					options={{
						disableDefaultUI: true,
						clickableIcons: false,
					}}
					mapContainerStyle={containerStyle}
					center={center}
					zoom={14}
				>
					{marker && <Marker position={marker} />}
				</GoogleMap>
				: <div>Loading....</div>} */}
		</>
	)
}

export default MapContainer