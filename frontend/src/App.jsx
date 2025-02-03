import React from 'react';

import ThemeContextProvider from './context/ThemeContext/ThemeContextProvider';
import MenuContextProvider from './context/MenuContext/MenuContextProvider'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';

import Layout from './Layout';
import { Home, About, Profile } from './components';


function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route path='' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='profile' element={<Profile />} />
        </Route>,
      </>
    )
  );

  return (
    <ThemeContextProvider>
      <MenuContextProvider>
        <RouterProvider router={router} />
      </MenuContextProvider>
    </ThemeContextProvider>
  );
}

export default App;
