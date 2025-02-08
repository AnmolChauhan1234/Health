import React, { useState } from 'react'
import api from '../../hooks/apiInstance';
import { useUserContext } from '../../context/UserContext/UserContextProvider';
import { useNavigate } from 'react-router-dom';
import Modal from '../Modal/Modal';


function Login() {

  //useNavigation
  const navigate = useNavigate();

  const {setUser , setUserRole} = useUserContext();
  const [isLoading , setIsLoading] = useState(false);

  //modal settings.
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalMessage , setModalMessage] = useState('');
  const [statusCode, setStatusCode] = useState('');

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const[formData , setFormData] = useState({
    email:"",
    password: ""
  });

  const handleChange = (e) => {
    const {name , value} = e.target;
    setFormData({
      ...formData, 
      [name]: value 
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //Calling login api.
    try {

      const response = await api.post("/accounts/login/" , {
        email: formData.email,
        password: formData.password
      })

      if(response.status === 200){

        //setting user to true , means user is logged in.
        setUser(true);
        sessionStorage.setItem('user' , true);

        //destructure the access_token and message received.
        const {access_token , message, role} = response.data;
        // console.log(role);

        //saving the role.
        setUserRole(role);

        //saving the token in session storage.
        sessionStorage.setItem('token' , access_token);

        //displaying message.
        console.log(message);
        // setIsModalOpen(true);
        // setModalMessage(message);
        // setStatusCode("success");
        // setPath('/dashboard')

        //navigate
        navigate("/dashboard");

      } else {
        //displaying error message.
        setIsModalOpen(true);
        setModalMessage("Invalid Email or Password");
        setStatusCode("error");

      }
    } catch (error) {

      //displaying message.
      setIsModalOpen(true);
      setModalMessage("Server Error.");
      setStatusCode("error");

      console.error('Could not Login. Try Again.',error);

    } finally{
      setIsLoading(false);

      //Clean up Submission.
      setFormData({
        email: "",
        password: ""
      })
    }
  }

  return (
    <>
    <Modal isOpen={isModalOpen} closeModal={closeModal} message={modalMessage} statusCode={statusCode}/>
    <form
      onSubmit={handleSubmit}
      className='border-[1px] border-gray-300 dark:border-gray-400 h-max w-[80vw] sm:w-96 flex flex-col gap-y-2 px-3 py-5 mx-auto shadow-md shadow-gray-200 dark:shadow-gray-500 text-black dark:text-white ubuntu-medium-italic rounded-md'
    >

      {/* Email section starts here */}
      <label 
        htmlFor="email"
        className='font-medium text-gray-500 dark:text-white'
      >
        Email Id
      </label>
      <input 
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder='email here ...'
        className='w-full h-9 border-[1px] border-gray-400 rounded-sm  mb-1 focus:border-amber-500 outline-none shadow-inner shadow-gray-100 dark:shadow-none px-2 text-gray-700 dark:text-white dark:placeholder:text-gray-400 ubuntu-light'
        required
      />
      {/* Email section ends here */}

      {/* Password section starts here */}
      <label 
        htmlFor="password"
        className='font-medium text-gray-500 dark:text-white'
      >
        Password
      </label>
      <input 
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        placeholder='password ...'
        className='w-full h-9 border-[1px] border-gray-400 rounded-sm mb-1 focus:border-amber-500 outline-none shadow-inner shadow-gray-100 dark:shadow-none px-2 text-gray-700 dark:text-white dark:placeholder:text-gray-400 ubuntu-light'
        required 
      />
      {/* Password section ends here */}

      <div>
        <p className='float-end text-sky-500 text-sm ubuntu-regular underline hover:text-sky-400 cursor-pointer'>
          forget password?
        </p>
      </div>
      <button 
        type="submit"
        className={`w-[80%] text-white font-medium mx-auto mt-1 py-1 rounded-sm cursor-pointer ${isLoading ? 'bg-amber-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-400'}`}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Login'}
      </button>

    </form>
    </>
  )
}

export default Login