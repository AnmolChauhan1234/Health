import React from 'react';

import ThemeContextProvider from './context/ThemeContext/ThemeContextProvider';
import MenuContextProvider from './context/MenuContext/MenuContextProvider';
import UserContextProvider from './context/UserContext/UserContextProvider';

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Layout from './Layout';
import {Home , About , Profile,Register,Contact} from './Pages/export';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>

        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile userRole={"hospital"}/>} />
          <Route path='contact' element={<Contact />} />
        </Route>,

        {/* Routes for auth starts here*/}
        <Route path='/auth' element={<Layout />}>
          <Route path='register' element={<Register />}/>,
        </Route>
        {/* Routes for auth ends here */}
      </>
    )
  );

  return (
    <ThemeContextProvider>
      <MenuContextProvider>
        <UserContextProvider>
          <RouterProvider router={router} />  
        </UserContextProvider>
      </MenuContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
