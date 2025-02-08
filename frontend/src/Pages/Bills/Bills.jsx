import React from 'react'
import { HospitalBill, PatientBill } from '../../components';
import useAuthRedirect from '../../hooks/authRedirect';

function Bills({role}) {

  //checking authentication.
  useAuthRedirect();

  return (
    <div>
      {role === "patient" ? <PatientBill /> : <HospitalBill />}
    </div>
  )
}

export default Bills