import React from 'react'
import Login from '../../components/Login/Login'
import Signup from '../../components/Signup/Singup'

function Register() {
  return (
    <div className='w-full h-max bg-white dark:bg-gray-900 text-black dark:text-white p-3'>
      <h1>Register Page is here.</h1>
      <Login/>
      {/* <Signup /> */}
    </div>
  )
}

export default Register