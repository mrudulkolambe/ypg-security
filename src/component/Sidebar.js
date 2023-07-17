import React, { useState } from 'react'
import { RiHomeFill, RiContactsBookLine, RiShieldUserFill, RiAlarmWarningFill, RiPoliceCarFill, RiFileChartLine, RiLogoutBoxLine } from 'react-icons/ri'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../context/Auth'


const Sidebar = () => {
	const [hoverState, setHoverState] = useState("")

	const handleHover = (nav) => {
		setHoverState(nav)
	}
	const { handleSignOut } = useAuthContext()
	return (
		<>
			<div className='z-10 padding-top-sidebar fixed top-0 left-0 w-1/12 h-screen sidebar-width shadow-xl flex flex-col items-center'>
				<div onMouseOver={() => { handleHover('home') }} onMouseOut={() => { handleHover('') }} className={hoverState === 'home' ? 'cursor-pointer text-indigo-600 accent-color border-2 mt-2 self-start flex duration-200 items-center border-l-0' : 'cursor-pointer items-center justify-center bg-white duration-200 border-b-2 border-t-2  border-transparent mt-2 self-start flex  text-clip overflow-hidden whitespace-nowrap'}>
					<div className='nav-height-main nav-width flex items-center justify-center'>
						<RiHomeFill className={hoverState === 'home' ? 'text-indigo-600 text-xl duration-200' : 'duration-200 text-xl text-gray-500'} />
					</div>
					<div className={hoverState === "home" ? 'font-bold block ml-10 opacity-100 duration-200 text-indigo-600 w-52' : 'w-0 text-indigo-600 opacity-0 duration-200'}>
						<Link to="/">Dashboard</Link>
					</div>
				</div>
				<div onMouseOver={() => { handleHover('employee') }} onMouseOut={() => { handleHover('') }} className={hoverState === 'employee' ? 'cursor-pointer text-indigo-600 accent-color border-2 self-start flex duration-200 items-center border-l-0' : 'cursor-pointer items-center justify-center bg-white duration-200 border-b-2 border-t-2  border-transparent self-start flex  text-clip overflow-hidden whitespace-nowrap'}>
					<div className='nav-height-main nav-width flex items-center justify-center'>
						<RiShieldUserFill className={hoverState === 'employee' ? 'text-indigo-600 text-xl duration-200' : 'duration-200 text-xl text-gray-500'} />
					</div>
					<div className={hoverState === "employee" ? 'nav-height-main font-bold block opacity-100 duration-200 text-indigo-600 w-52' : 'w-0 text-indigo-600 opacity-0 duration-200 text-clip overflow-hidden whitespace-nowrap'}>
						<p className='flex items-center border-b-2 nav-height-main w-full  pl-10'>Employee</p>
						<div className={hoverState === 'employee' ? 'h-auto duration-200 bg-white' : 'h-0 duration-200'}>
							<Link to="/add-employee"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>Add Employee</p></Link>
							<Link to="/view-employee"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>View Employee</p></Link>
							<Link to="/employee-track"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>Employee Track</p></Link>
							<Link to="/notification"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>Add Notification</p></Link>
							<Link to="/view-notification"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>View Notification</p></Link>
						</div>
					</div>
				</div>
				<div onMouseOver={() => { handleHover('asset') }} onMouseOut={() => { handleHover('') }} className={hoverState === 'asset' ? 'cursor-pointer text-indigo-600 accent-color border-2 self-start flex duration-200 items-center border-l-0' : 'cursor-pointer items-center justify-center bg-white duration-200 border-b-2 border-t-2  border-transparent self-start flex  text-clip overflow-hidden whitespace-nowrap'}>
					<div className='nav-height-main nav-width flex items-center justify-center'>
						<RiPoliceCarFill className={hoverState === 'asset' ? 'text-indigo-600 text-xl duration-200' : 'duration-200 text-xl text-gray-500'} />
					</div>
					<div className={hoverState === "asset" ? 'nav-height-main font-bold block opacity-100 duration-200 text-indigo-600 w-52' : 'w-0 text-indigo-600 opacity-0 duration-200 text-clip overflow-hidden whitespace-nowrap'}>
						<p className='flex items-center border-b-2 nav-height-main w-full  pl-10'>Asset Management</p>
						<div className={hoverState === 'asset' ? 'h-auto duration-200 bg-white' : 'h-0 duration-200'}>
							<Link to="/add-asset"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>Add Asset</p></Link>
							<Link to="/view-asset"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>View Asset</p></Link>
						</div>
					</div>
				</div>
				<div onMouseOver={() => { handleHover('job') }} onMouseOut={() => { handleHover('') }} className={hoverState === 'job' ? 'cursor-pointer text-indigo-600 accent-color border-2 self-start flex duration-200 items-center border-l-0' : 'cursor-pointer items-center justify-center bg-white duration-200 border-b-2 border-t-2  border-transparent self-start flex  text-clip overflow-hidden whitespace-nowrap'}>
					<div className='nav-height-main nav-width flex items-center justify-center'>
						<RiAlarmWarningFill className={hoverState === 'job' ? 'text-indigo-600 text-xl duration-200' : 'duration-200 text-xl text-gray-500'} />
					</div>
					<div className={hoverState === "job" ? 'nav-height-main font-bold block opacity-100 duration-200 text-indigo-600 w-52' : 'w-0 text-indigo-600 opacity-0 duration-200 text-clip overflow-hidden whitespace-nowrap'}>
						<p className='flex items-center border-b-2 nav-height-main w-full  pl-10'>Job Management</p>
						<div className={hoverState === 'job' ? 'h-auto duration-200 bg-white' : 'h-0 duration-200'}>
							<Link to="/assign-jobs"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>Assign Jobs</p></Link>
							<Link to="/view-jobs"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>View Jobs</p></Link>
							<Link to="/view-alarm-response"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>Alarm Response</p></Link>
						</div>
					</div>
				</div>
				<div onMouseOver={() => { handleHover('logs') }} onMouseOut={() => { handleHover('') }} className={hoverState === 'logs' ? 'cursor-pointer text-indigo-600 accent-color border-2 self-start flex duration-200 items-center border-l-0' : 'cursor-pointer items-center justify-center bg-white duration-200 border-b-2 border-t-2  border-transparent self-start flex  text-clip overflow-hidden whitespace-nowrap'}>
					<div className='nav-height-main nav-width flex items-center justify-center'>
						<RiContactsBookLine className={hoverState === 'logs' ? 'text-indigo-600 text-xl duration-200' : 'duration-200 text-xl text-gray-500'} />
					</div>
					<div className={hoverState === "logs" ? 'nav-height-main font-bold block opacity-100 duration-200 text-indigo-600 w-72' : 'w-0 text-indigo-600 opacity-0 duration-200 text-clip overflow-hidden whitespace-nowrap'}>
						<p className='flex items-center border-b-2 nav-height-main w-full  pl-10'>Logs</p>
						<div className={hoverState === "logs" ? 'h-auto duration-200 bg-white' : 'h-0 duration-200'}>
							<Link to="/view-employee-attendance"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>View Employee Log</p></Link>
							<Link to="/view-job-assigned-logs"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>Assigned Jobs Log</p></Link>
							<Link to="/view-job-request-logs"><p className='hidden hover:bg-gray-200 duration-200 items-center nav-height pl-10'>Job Request Log</p></Link>
							<Link to="/view-acitivity-logs"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>Activity Logs</p></Link>
						</div>
					</div>
				</div>
				<div onMouseOver={() => { handleHover('report') }} onMouseOut={() => { handleHover('') }} className={hoverState === 'report' ? 'cursor-pointer text-indigo-600 accent-color border-2 self-start hidden duration-200 items-center border-l-0' : 'cursor-pointer items-center justify-center bg-white duration-200 border-b-2 border-t-2  border-transparent self-start hidden text-clip overflow-hidden whitespace-nowrap'}>
					<div className='nav-height-main nav-width flex items-center justify-center'>
						<RiFileChartLine className={hoverState === 'report' ? 'text-indigo-600 text-xl duration-200' : 'duration-200 text-xl text-gray-500'} />
					</div>
					<div className={hoverState === "report" ? 'nav-height-main font-bold block opacity-100 duration-200 text-indigo-600 w-52' : 'w-0 text-indigo-600 opacity-0 duration-200 text-clip overflow-hidden whitespace-nowrap'}>
						<p className='flex items-center border-b-2 nav-height-main w-full  pl-10'>Report</p>
						<div className={hoverState === "report" ? 'h-auto duration-200 bg-white' : 'h-0 duration-200'}>
							<Link to="/employee-route"><p className='hover:bg-gray-200 duration-200 flex items-center nav-height pl-10'>Employee Route</p></Link>
						</div>
					</div>
				</div>
				<div onMouseOver={() => { handleHover('logout') }} onMouseOut={() => { handleHover('') }} className={hoverState === 'logout' ? 'cursor-pointer text-indigo-600 accent-color border-2 mt-2 self-start flex duration-200 items-center border-l-0' : 'cursor-pointer items-center justify-center bg-white duration-200 border-b-2 border-t-2  border-transparent mt-2 self-start flex  text-clip overflow-hidden whitespace-nowrap'}>
					<div className='nav-height-main nav-width flex items-center justify-center'>
						<RiLogoutBoxLine className={hoverState === 'logout' ? 'text-indigo-600 text-xl duration-200' : 'duration-200 text-xl text-gray-500'} />
					</div>
					<div className={hoverState === "logout" ? 'font-bold block ml-10 opacity-100 duration-200 text-indigo-600 w-52' : 'w-0 text-indigo-600 opacity-0 duration-200'}>
						<p onClick={handleSignOut} >Logout</p>
					</div>
				</div>
			</div>
		</>
	)
}

export default Sidebar