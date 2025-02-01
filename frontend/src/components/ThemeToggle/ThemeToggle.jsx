import React from 'react'
import { useDarkMode } from '../../context/ThemeContext/ThemeContextProvider'


function ThemeToggle() {

  const {darkMode , setDarkMode} = useDarkMode();

  const handleClick = () => {
    setDarkMode(!darkMode);
  }

  return (
    
    <button 
      className='h-8 w-8 cursor-pointer'
      onClick={handleClick}
    >
      <img 
        className='h-full w-full object-contain object-center'
        src={darkMode ? '/images/day-mode.png' : '/images/night-mode.png'} 
        alt="theme" 
      />
    </button>

    
  )
}

export default ThemeToggle;