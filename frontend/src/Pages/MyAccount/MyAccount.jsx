import React from 'react'
import { HospitalAccount, PatientAccount } from '../../components';

function MyAccount({role}) {


  return (
    <div>
      {
        role === 'patient' ? <PatientAccount /> : <HospitalAccount />
      }
    </div>
  )
}

export default MyAccount