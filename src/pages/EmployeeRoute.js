import React from 'react'
import Footer from '../component/Footer'
import Sidebar from '../component/Sidebar'
import Topbar from '../component/Topbar'

const EmployeeRoute = () => {
	return (
		<>
			<Sidebar />
			<Topbar />
			<div className='z-0 page-dimension'>
				<div className='px-5 py-6 h-full w-full'>
					<div className='w-full bg-white py-5 px-5 mb-16'>
						<div className='w-full flex justify-end mb-5 items-center'><label htmlFor="filter" className='text-sm mr-3 text-gray-500'>Search: </label><input id='filter' type="text" className='border rounded-md outline-none font-normal text-sm px-3 py-2' placeholder='Search...' /></div>
						<table className='w-full text-sm'>
							<tr className='w-full text-left border'>
								<th className='w-3/12 font-bold py-3 px-2 border-r'>Name</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Username</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Phone No.</th>
								<th className='w-3/12 font-bold py-3 px-2 border-r'>Driving License</th>
								<th className='w-2/12 font-bold py-3 px-2 border-r'>Action</th>
							</tr>
							<tr className='w-full text-left border'>
								<td className='w-3/12 font-light py-3 px-2 border-r'>Mrudul Kolambe</td>
								<td className='w-2/12 font-light py-3 px-2 border-r'>mrudulkolambe</td>
								<td className='w-2/12 font-light py-3 px-2 border-r'>mrudulkolambe02@gmail.com</td>
								<td className='w-3/12 font-light py-3 px-2 border-r'>mrudulkolambe02@gmail.com</td>
								<td className='w-2/12 font-light py-3 px-2 border-r'>7057094772</td>
							</tr>
						</table>
					</div>
				</div>
				<Footer />
			</div>
		</>
	)
}

export default EmployeeRoute