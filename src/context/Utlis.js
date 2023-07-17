import React, { createContext, useContext, useEffect, useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from '../context/firebase_config'
import axios from "axios";


const UtilsContext = createContext();

export function UtilsContextProvider({ children }) {
	const [mapCenter, setMapCenter] = useState();
	const [alert, setAlert] = useState("")

	useEffect(() => {
		if (alert && alert.length !== 0) {
			setTimeout(() => {
				setAlert('')
			}, 3000);
		}
	}, [alert]);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((pos) => {
				setMapCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude })
			});
		} else {
			//   x.innerHTML = "Geolocation is not supported by this browser.";
		}

		//   function showPosition(position) {
		// 	x.innerHTML = "Latitude: " + position.coords.latitude + 
		// 	"<br>Longitude: " + position.coords.longitude;
		//   }
	}, []);

	const uploadMedia = (file, path, formObject, setFormObject, setLoading, model) => {
		setLoading(true)
		const storageRef = ref(storage, `${path}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		uploadTask.on('state_changed',
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				switch (snapshot.state) {
					case 'paused':
						console.log('Upload is paused');
						break;
					case 'running':
						console.log('Upload is running');
						break;
				}
			},
			(error) => {
				// Handle unsuccessful uploads
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					console.log(downloadURL)
					if (model === 'asset') {
						let formData = formObject
						formData.carimage = downloadURL
						setFormObject(formData)
						setLoading(false)
					} else if (model === 'profile_picture') {
						let formData = formObject
						formData.profileimage = downloadURL
						setLoading(false)
					} else if (model === 'document_image') {
						let formData = formObject
						formData.documentimage = downloadURL
						setFormObject(formData)
						setLoading(false)
					}
				});
			}
		);
	}


	return (
		<UtilsContext.Provider value={{ setAlert, alert, uploadMedia, mapCenter }}>
			{children}
		</UtilsContext.Provider>
	);
}

export function useUtilsContext() {
	return useContext(UtilsContext);
}
