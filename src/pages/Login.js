import React from 'react'
import { useState } from 'react'
import { BiUser } from 'react-icons/bi'
import { MdSecurity } from 'react-icons/md'
import { useAuthContext } from '../context/Auth'
import Input from '../component/Input'
import { auth, db } from '../context/firebase_config'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, onSnapshot } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'


const Login = () => {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const { handleSignOut, setUser } = useAuthContext()
	const navigate = useNavigate()
	const handleUserSignin = () => {
		signInWithEmailAndPassword(auth, email, password)
			.then(async (userCredential) => {
				const user = userCredential.user;
				onSnapshot(doc(db, "Users", user.uid), (doc) => {
					user.role = doc.data().role
					if (user.role === "admin") {
						setUser(user)
						navigate("/")
					} else {
						handleSignOut()
					}
				});
			})
			.catch((error) => {
				console.log(error.message)
			});
	}
	return (
		<>
			<div className='h-screen w-screen flex bg-img'>
				<div className='h-screen w-2/6 login-left px-8 flex flex-col justify-center'>
					<p className='italic text-white font-normal text-xl'>Success builds character. Failure reveals it.</p>
					<p className='italic text-white font-light text-base mt-3'>- Dave Checketts</p>
				</div>
				<div className='h-screen w-4/6 bg-white bg-img '>
					<form className='flex justify-center flex-col items-center  h-full'>
						<p className='w-5/12 text-left mb-7 text-lg text-gray-500'>Sign In to continue</p>

						<div className='w-5/12 flex items-center py-1 bg-input border-2 border-black rounded-md'>
							<div className='px-4'><BiUser className='text-2xl icon-color' /></div>
							<input label={"Email"} id={"email"} value={email} className='bg-transparent outline-none text-sm font-normal py-1' placeholder={'Enter Your Email'} onChange={(e) => { setEmail(e.target.value) }} type={"email"} />
						</div>

						<div className='w-5/12 flex items-center py-2 bg-input border-2 border-black rounded-md mt-6'>
							<div className='px-4'><MdSecurity className='text-2xl icon-color' /></div>
							<input label={"Password"} id={"password"} value={password} placeholder={'Enter Your Password'} onChange={(e) => { setPassword(e.target.value) }} type={"password"} className='bg-transparent outline-none text-sm font-normal py-1' />
						</div>

						<button onClick={handleUserSignin} type='button' className='w-5/12 login-btn px-3 py-2 text-white rounded-lg mt-6'>Sign In</button>
						<div className='w-5/12 flex justify-between items-center'>
							<p className='mt-6 text-gray-500'>Copyright © 2021 ConnectX Security</p>
							<a href='mailto:info@connectiasolution.com' className='underline mt-6 text-gray-500'>Support</a>
						</div>
					</form>
				</div>
			</div>
		</>
	)
}

export default Login