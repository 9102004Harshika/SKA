import React from 'react'
import { useParams } from 'react-router-dom'

const EditCoursesPage = () => {
    const {id}=useParams()
  return (
    <div>
      <p className='text-center text-5xl'>please form bana do </p>&nbsp;
      <h1 className='text-center text-2xl'>Bass add course ka form idhar daal do as it is  mei functionality kar dungi </h1>
    </div>
  )
}

export default EditCoursesPage
