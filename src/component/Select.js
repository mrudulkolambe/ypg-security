import React from 'react'

const Select = ({ value, onChange, options, id, label, placeholder, className, defaultOption=false }) => {
	return (
		<div>
			{label && <label htmlFor={id}>{label}: </label>}
			<select value={value} onChange={onChange} className={'rounded-md duration-200 focus:border-gray-500 w-full h-[43.9005px] py-2 px-4 border-2 outline-none ' + className} id={id} placeholder={placeholder}>
				{defaultOption && <option selected value={""}>{"Choose Job"}</option>}
				{options?.map((option) => {
					return <option value={option?.value} key={option?.value}>{option?.label}</option>
				})}
			</select>
		</div>
	)
}

export default Select
