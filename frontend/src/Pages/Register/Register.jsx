import React, { useEffect, useState } from 'react'
import { Scene , Login , Signup } from '../../components';

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
      className='w-full bg-white dark:bg-gray-900 text-black dark:text-white px-0.5 py-2 grid grid-cols-1 md:grid-cols-2 border border-black min-h-[70vh]'
    >
      {/* Model block starts here */}
      <section className='hidden md:flex my-auto h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-2xl overflow-hidden'>
        <div 
          style={{ width: '100%', position: 'relative' }}
        >
          <Scene />
        </div>
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