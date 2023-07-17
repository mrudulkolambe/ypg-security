import React from 'react'

const Textarea = ({ value, onChange, id, label, placeholder, className='' }) => {
  return (
    <div className={className}>
      <label htmlFor={id}>{label}: </label>
      <textarea value={value} onChange={onChange} className='rounded-md duration-200 focus:border-gray-500 mt-2 w-full h-40 py-2 px-4 border-2 outline-none resize-none' id={id} placeholder={placeholder}></textarea>
    </div>
  )
}

export default Textarea