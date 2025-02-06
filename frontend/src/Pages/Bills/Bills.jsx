import React from 'react'
import { HospitalBill, PatientBill } from '../../components';

function Bills({role}) {

  return (
    <div>
      {role === "patient" ? <PatientBill /> : <HospitalBill />}
    </div>
  )
}

export default Bills