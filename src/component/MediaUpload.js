import React from 'react'
import { useState } from 'react'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect } from 'react';
import { useUtilsContext } from '../context/Utlis';

const MediaUpload = ({ label, path, setURL }) => {
	const [file, setFile] = useState()
	const { setAlert } = useUtilsContext()

	useEffect(() => {
		if (file) {
			handleUpload()
		}
	}, [file])


	const handleUpload = () => {
		const storage = getStorage();
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
				setAlert(error.message)
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					setURL(downloadURL);
					setAlert("Upload Successfull!")
				});
			}
		);
	}
	return (
		<>
			<div className='w-full'>
				<label htmlFor="mediaUpload">{label}: </label>
				<input type="file" onChange={(e) => { setFile(e.target.files[0]) }} className='rounded-md duration-200 focus:border-gray-500 mt-2 w-full py-2 px-4 border-2 outline-none' id='mediaUpload' />
			</div>
		</>
	)
}

export default MediaUpload