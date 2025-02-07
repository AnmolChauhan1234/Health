import React, { useContext, useState, useEffect } from 'react';
import UserContext from './UserContext';

function UserContextProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser === 'true';
  });

  const [userRole, setUserRole] = useState(() => {
    const storedUserRole = localStorage.getItem('role');
    return storedUserRole ? JSON.parse(storedUserRole) : 'patient';
  });

  useEffect(() => {
    localStorage.setItem('role', JSON.stringify(userRole));
  }, [userRole]);

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