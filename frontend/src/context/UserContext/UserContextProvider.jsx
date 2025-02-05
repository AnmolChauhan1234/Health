import React, { useContext, useState } from 'react'
import UserContext from './UserContext';

function UserContextProvider({children}) {

  const [user , setUser] = useState(
    () => {
      const storedUser = localStorage.getItem('user');
      return storedUser === 'true';
    }
  );

  return (
    <UserContext.Provider value={{user,setUser}}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext);
}

export default UserContextProvider