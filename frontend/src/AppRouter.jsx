// AppRouter.jsx
import React from 'react';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { useUserContext } from './context/UserContext/UserContextProvider';
import Layout from './Layout';
import { Home, About, Profile, Register, Contact, MyAccount, History, Bills, Manage } from './Pages/export';

function AppRouter() {
  const { userRole } = useUserContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
        </Route>
        {/* Authentication Routes */}
        <Route path='/auth' element={<Layout />}>
          <Route path='register' element={<Register />} />
        </Route>
        {/* Dashboard Routes */}
        <Route path='/dashboard' element={<Layout />}>
          <Route index element={<Profile role={userRole} />} />
          <Route path='accounts' element={<MyAccount role={userRole} />} />
          <Route path='bills' element={<Bills role={userRole} />} />
          <Route path='history' element={<History role={userRole} />} />
          <Route path='manage' element={<Manage />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default AppRouter;