import React from 'react'
import { useState } from 'react'
import { AiOutlineDelete, AiOutlineEye } from 'react-icons/ai'
import { BsPencil, BsKey } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useUtilsContext } from '../context/Utlis'
import Spinner from './Spinner'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../context/firebase_config'

const EmployeeRow = ({ employee, i, employees, setEmployees }) => {
	const [openMenu, setOpenMenu] = useState(false)
	const [loading, setLoading] = useState(false)
	const navigate = useNavigate()


	return (
		<>
			<tr onClick={() => { openMenu ? setOpenMenu(false) : setOpenMenu(true) }} className={i % 2 === 0 ? 'cursor-pointer w-full text-left border' : 'cursor-pointer w-full text-left border bg-blue-100 bg-opacity-70'
			}>
				<td className='w-2/12 font-light py-3 px-2 border-r mb-3'>{`${employee?.firstname} ${employee?.lastname}`}</td>
				<td className='w-2/12 font-light py-3 px-2 border-r mb-3'>{employee?.username}</td>
				<td className='w-3/12 font-light py-3 px-2 border-r mb-3'>{employee?.email}</td>
				<td className='w-2/12 font-light py-3 px-2 border-r mb-3'>{employee?.phonenumber}</td>
				<td className='w-3/12 font-light py-3 px-2 border-r mb-3'>{employee?.drivinglicense}</td>
			</tr>
			{
				openMenu && <td className='font-light py-3 px-2 border'>Status: <span className={employee?.status === "offline" ? "bg-red-200 text-sm rounded-full px-2 py-0.5" : "bg-green-200 text-sm rounded-full px-2 py-0.5"}>{employee?.status}</span></td>
			}
			{
				openMenu && <td className='font-light py-3 px-2 border'>Address: {employee?.address}</td>
			}
			{
				openMenu && <td className='font-light py-3 px-2 flex h-full'>
					<span onClick={async () => {
						const confirm = window.confirm("Do you really want to delete user?")
						if (confirm) {
							await deleteDoc(doc(db, "Users", employee?.employeeId));
							alert("Document deleted!")
						}
						else {
							alert("Deletion cancled!")
						}
					}} className='mx-1 border border-indigo-600 hover:border-transparent cursor-pointer hover:bg-indigo-600 bg-white duration-150 text-indigo-600 p-2 hover:text-white rounded-lg'>{loading ? <Spinner /> : <AiOutlineDelete />}</span>
					<span onClick={() => { navigate(`/update-employee/${employee?.employeeId}`) }} className='mx-1 border border-indigo-600 hover:border-transparent cursor-pointer hover:bg-indigo-600 bg-white duration-150 text-indigo-600 p-2 hover:text-white rounded-lg'><BsPencil /></span>
					<span className='mx-1 border border-indigo-600 hover:border-transparent cursor-pointer hover:bg-indigo-600 bg-white duration-150 text-indigo-600 p-2 hover:text-white rounded-lg'><BsKey /></span>
					<span onClick={() => { navigate(`/employee/${employee?.employeeId}`) }} className='mx-1 border border-indigo-600 hover:border-transparent cursor-pointer hover:bg-indigo-600 bg-white duration-150 text-indigo-600 p-2 hover:text-white rounded-lg'><AiOutlineEye /></span>
				</td>
			}
		</>
	)
}

export default EmployeeRow