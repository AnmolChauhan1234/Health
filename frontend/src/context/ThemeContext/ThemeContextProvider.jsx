import React, { useContext, useEffect, useState } from 'react'
import ThemeContext from './ThemeContext'

function ThemeContextProvider({children}) {

  const [darkMode , setDarkMode] = useState(
    localStorage.getItem('theme') === 'dark'
  );

  useEffect( () => {
    // console.log('Dark Mode',darkMode)
    if(darkMode){
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme' , 'dark');
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme','light');
    }
  } , [darkMode])

  return (
    <ThemeContext.Provider value={{darkMode , setDarkMode}}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useDarkMode() {
  return useContext(ThemeContext);
}

export default ThemeContextProvider;