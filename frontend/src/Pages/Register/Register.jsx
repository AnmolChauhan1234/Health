import React, { useEffect, useState } from 'react'
// import Login from '../../components/Login/Login'
// import Signup from '../../components/Signup/Singup'
import { ThreeDModel , Login , Signup } from '../../components';

function Register() {

  const [isLoginView , setIsLoginView] = useState( () => {
    const storedState = localStorage.getItem('isLoginViewOn');
    return storedState === 'true';
  });

  useEffect( () => {
    localStorage.setItem('isLoginViewOn' , isLoginView);
  } , [isLoginView])

  const handleSwitchClick = () => {
    setIsLoginView(!isLoginView);
  }

  return (
    <main 
      className='w-full bg-white dark:bg-gray-900 text-black dark:text-white px-0.5 py-2 grid grid-cols-1 md:grid-cols-2'
    >
      {/* Model block starts here */}
      <section 
        className='hidden md:block my-auto'
      >
        <ThreeDModel />
      </section>
      {/* Model block ends here */}

      {/* Login or Sign-up section starts here */}
      <section className='my-auto'>
        {/* Switch section starts here */}
        <div 
          className='flex items-center justify-center py-1 gap-x-8 border-b-[1px] border-b-gray-600 mb-3 w-[80vw] sm:w-96 mx-auto transition-cus'
        >
          <button
            onClick={handleSwitchClick} 
            className={`flex basis-1 ${isLoginView ? 'underline text-amber-600' : ''} cursor-pointer`}
          >
            Login
          </button>

          <button
            onClick={handleSwitchClick} 
            className={`flex basis-1 ${!isLoginView ? 'underline text-amber-600' : ''} cursor-pointer`}
          >
            Register
          </button>
        </div>
        {/* Switch section ends here */}

        {/* Login or Sign-up component starts here */}
        <div>
          {
            isLoginView ? <Login /> : <Signup/>
          }
        </div>
        {/* Login or Sign-up component ends here */}
      </section>
      {/* Login or Sign-up section ends here */}
    </main>
  )
}

export default Register