import React from 'react'
import './spinner.css'

const Spinner = () => {
  return (
    <div className='flex'>
      <div className='spinner spinner-1'></div>
      <div className='spinner spinner-2'></div>
      <div className='spinner spinner-3'></div>
      <div className='spinner spinner-4'></div>
      <div className='spinner spinner-5'>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default Spinner
