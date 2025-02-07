import React from 'react'
import { HospitalHistory, PatientHistory } from '../../components';

function History({role}) {

  return (
    <div>
      {
        role === 'patient' ? <PatientHistory /> : <HospitalHistory />
      }
    </div>
  )
}

export default History