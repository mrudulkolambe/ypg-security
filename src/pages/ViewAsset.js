import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'
import { useAssetContext } from '../context/Asset'
import { BsPencil } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import axios from 'axios'
import { deleteDoc, doc } from 'firebase/firestore'
import { db } from '../context/firebase_config'

const ViewAsset = () => {
	const { assets } = useAssetContext()
	const navigate = useNavigate()
	const [searchResults, setSearchResults] = useState([])

	useEffect(() => {
		setSearchResults(assets)
	}, [assets]);

	const handleSearch = (evt) => {
		if(evt.target.value.length > 0){
			const result = assets?.filter((asset) => {
				// console.log(asset)
				return asset?.carName?.toLowerCase().includes(evt?.target?.value.toLowerCase()) || asset?.carModel?.toLowerCase().includes(evt?.target?.value.toLowerCase()) || asset?.plateNumber?.toLowerCase().includes(evt?.target?.value.toLowerCase())
			});
			setSearchResults(result)
			// console.log(result)
		}
		else{
			setSearchResults(assets)
		}
	}
	
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div className='flex justify-between items-center mb-3'>
						<h1 className='font-bold text-3xl'>Assets</h1>
						<Link to="/add-asset" className='duration-200 border rounded-md px-2 py-1 hover:text-white text-indigo-400 border-indigo-400 hover:border-transparent hover:bg-indigo-400 text-sm'>Add Asset</Link>
					</div>
					<div className='w-full bg-white py-5 px-5 mb-16'>
						<div className='w-full flex justify-end mb-5 items-center'>
							<label htmlFor="filter" className='text-sm mr-3 text-gray-500'>Search: </label>
							<input onChange={handleSearch} id='filter' type="text" className='border rounded-md outline-none font-normal text-sm px-3 py-2' placeholder='Search...' />
						</div>
						<table className='w-full text-sm'>
							<tr className='w-full text-left border'>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Car Name</th>
								<th className='w-6/12 font-bold py-3 px-2 border-r'>Car Model</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Plate Number</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Action</th>
							</tr>
							{
								searchResults && searchResults.map((asset, i) => {
									return <tr className={i % 2 === 0 ? 'w-full text-left border' : 'w-full text-left border bg-blue-100 bg-opacity-70'
									}>
										<td className='w-2/12 font-light py-3 px-2 border-r'>{asset.carName}</td>
										<td className='w-6/12 font-light py-3 px-2 border-r'>{asset.carModel}</td>
										<td className='w-2/12 font-light py-3 px-2 border-r'>{asset.plateNumber}</td>
										<td className='w-2/12 font-light py-3 px-2 border-r flex'>
											<span onClick={async () => {
												const confirm = window.confirm("Do you really want to delete the asset?")
												if (confirm) {
													await deleteDoc(doc(db, "Asset", asset?.assetId));
													alert("Asset deleted!")
												}
												else {
													alert("Deletion cancled!")
												}
											}} className="mx-1 cursor-pointer text-indigo-600 hover:text-white bg-white border border-indigo-600 hover:border-transparent duration-150 rounded-md p-2 hover:bg-indigo-600"><AiOutlineDelete /></span>
											<span onClick={() => { navigate(`/update-asset/${asset?.assetId}`) }} className="mx-1 cursor-pointer text-indigo-600 hover:text-white bg-white border border-indigo-600 hover:border-transparent duration-150 rounded-md p-2 hover:bg-indigo-600"><BsPencil /></span>
										</td>
									</tr>
								})
							}

						</table>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default ViewAsset