import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { useUserContext } from "./context/UserContext/UserContextProvider";

import Layout from "./Layout";
import {
  Home,
  About,
  Profile,
  Register,
  Contact,
  MyAccount,
  History,
  Bills,
  Manage,
  DetailsView,
  BillPaymentPage,
  DirectPaymentPage,
  EMIPaymentPage,
  AddBillPage,
  BillDetailsHistory,
} from "./Pages/export";

function AppRouter() {
  const { userRole } = useUserContext();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="details" element={<DetailsView />} />
        </Route>

        {/* Authentication Routes */}
        <Route path="/auth" element={<Layout />}>
          <Route path="register" element={<Register />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Profile role={userRole} />} />
          <Route path="accounts" element={<MyAccount role={userRole} />} />
          <Route path="history" element={<History role={userRole} />} />
          <Route path="manage" element={<Manage />} />

          {/* Bills Route with Nested Routes */}
          <Route path="bills">
            <Route index element={<Bills role={userRole} />} />
            <Route path='add-bill-details' element={<AddBillPage />} />,
            <Route path="bill-details/:billing_id" element={ <BillDetailsHistory />}/>
            <Route path='add-bill-details' element={<AddBillPage />} />
            {/* <Route
              path=":billId"
              element={<BillDetailsPage role={userRole} />}
            />
            <Route
              path=":billId/pay-direct"
              element={<DirectPaymentPage role={userRole} />}
            />
            <Route
              path=":billId/pay-emi"
              element={<EMIPaymentPage role={userRole} />}
            /> */}
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default AppRouter;
