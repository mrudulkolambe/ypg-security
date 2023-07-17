import React from 'react'
import AssetsIcon from './AssetsIcon'
import CarsIcon from './CarsIcon'
import UsersIcon from './UsersIcon'

const HomepageDataTop = ({ title, data, icon }) => {
	return (
		<>
			<div className='rounded-md bg-white p-3 flex items-center border-l-4 border-gray-700 shadow-md text-gray-700'>
				<div className='h-full w-11/12 flex flex-col'>
					<p className='text-lg'>{title}</p>
					<p className='text-2xl mt-2 font-semibold'>{data}</p>
				</div>
				<div className='h-full w-1/12 flex items-center mr-2'>
					{icon === 'users' ? <UsersIcon className="text-gray-700" /> : icon === 'cars' ? <CarsIcon className="text-gray-700" /> : icon === 'assets' ? <AssetsIcon className="text-gray-700" /> : null}
				</div>
			</div>
		</>
	)
}

export default HomepageDataTop