import React from 'react'
import { HospitalHistory, PatientHistory } from '../../components';
import useAuthRedirect from '../../hooks/authRedirect';


function History({role}) {

  //checking authentication.
  useAuthRedirect();

  return (
    <div>
      {
        role === 'patient' ? <PatientHistory /> : <HospitalHistory />
      }
    </div>
  )
}

export default History