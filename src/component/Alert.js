import React from 'react'

const Alert = ({ message }) => {
	return (
		<>
			<div className={message && message.length >= 0 ? "Nunito duration-300 py-4 px-10 bg-gray-800 fixed bottom-0 w-screen z-50 text-white" : "Nunito duration-300 py-4 px-10 bg-gray-800 fixed -bottom-14 w-screen z-50 text-white"}>{message}</div>
		</>
	)
}

export default Alert