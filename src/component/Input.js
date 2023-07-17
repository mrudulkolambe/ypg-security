import React from 'react'

const Input = ({ value, onChange, type, id, label, placeholder, message, readOnly }) => {
    return (
        <div>
            {label && <label htmlFor={id}>{label}: </label>}
            <input readOnly={readOnly} value={value} onChange={onChange} type={type} className={ 'rounded-md duration-200 focus:border-gray-500 w-full h-[43.9005px] py-2 px-4 border-2 outline-none'} id={id} placeholder={placeholder} />
            {message && <p className='text-xs text-gray-500'>{message}</p>}
        </div>
    )
}

export default Input