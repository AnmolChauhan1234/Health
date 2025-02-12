import React, { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';

function UserContextProvider({ children }) {

  //user state
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user');
    return storedUser === 'true';
  });

  // userRole state
  const [userRole, setUserRole] = useState(() => {
    const storedUserRole = sessionStorage.getItem('role');
    return storedUserRole ? JSON.parse(storedUserRole) : 'patient';
  });

  // useEffect(() => {
  //   sessionStorage.setItem('role', JSON.stringify(userRole));
  // }, [userRole]);

  return (
    <UserContext.Provider value={{ user, setUser, userRole, setUserRole }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  return useContext(UserContext);
}

export default UserContextProvider;