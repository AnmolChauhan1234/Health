import React, { useContext, useState } from 'react'
import UserContext from './UserContext';

function UserContextProvider({children}) {

  const [user , setUser] = useState(
    localStorage.getItem('user') || null
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