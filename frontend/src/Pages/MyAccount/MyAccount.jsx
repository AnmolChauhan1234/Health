import React from 'react'
import { HospitalAccount, PatientAccount } from '../../components';
import useAuthRedirect from '../../hooks/authRedirect';

function MyAccount({role}) {

  //checking authentication.
  useAuthRedirect();

  return (
    <div className='w-full min-h-[50vh] dark:bg-gray-800 py-8'>
      {
        role === 'patient' ? <PatientAccount /> : <HospitalAccount />
      }
    </div>
  )
}

export default MyAccount