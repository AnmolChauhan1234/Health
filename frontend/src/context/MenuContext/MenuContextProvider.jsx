import React, { useContext, useEffect, useState } from 'react';
import MenuContext from './MenuContext';

const MenuContextProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(
    () => {
      const storedIsOpen = localStorage.getItem('isopen');
      return storedIsOpen === 'true';
    }
  );

  useEffect( () => {
    localStorage.setItem('isopen' , isOpen);
  } , [isOpen]);

  const toggleMenu = () => {
    setIsOpen(prev => !prev);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  return (
    <MenuContext.Provider value={{ isOpen, toggleMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export function useMenuContext(){
  return useContext(MenuContext);
}

export default MenuContextProvider;
