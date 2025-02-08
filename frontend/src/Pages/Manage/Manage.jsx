import React from 'react'
import useAuthRedirect from '../../hooks/authRedirect';

function Manage() {

  //checking authentication.
  useAuthRedirect();


  return (
    <div>Manage</div>
  )
}

export default Manage