import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../utils/firebase';


const Login = () => {
  
  const [isSignInForm, setIsSignInForm] = useState(true);

  const [errorMessage , setErrorMessage] = useState(null)

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    // Validate the form data

    const message = checkValidData(email.current.value, password.current.value , name.current.value);
    setErrorMessage(message);

    if(message) return ;

    // Sign In / Sign Up Logic

    if(!isSignInForm){
      // Sign Up Logic

      createUserWithEmailAndPassword(auth, email.current.value, password.current.value , name.current.value)
       .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });

    } else {

      signInWithEmailAndPassword(auth, email.current.value, password.current.value , name.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode + "-" + errorMessage);
  });

    }
   
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
      <img 
        src="https://assets.nflxext.com/ffe/siteui/vlv3/d1532433-07b1-4e39-a920-0f08b81a489e/67033404-2df8-42e0-a5a0-4c8288b4da2c/IN-en-20231120-popsignuptwoweeks-perspective_alpha_website_large.jpg" 
        alt="logo" 
      />
      </div>
      <form onSubmit={(e) => e.preventDefault() } className='w-3/12 absolute p-12 bg-black my-24 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
        <h1 
          className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
        <input 
        ref={name}
          type='text' 
          placeholder='Full Name' 
          className='p-4 my-4 w-full bg-gray-700' />
        )}
          <input 
          ref={email}
          type='text' 
          placeholder='Email Address' 
          className='p-4 my-4 w-full bg-gray-700' 
          />
        <input 
        ref={password}
          type='password' 
          placeholder='Password' 
          className='p-4 my-4 w-full bg-gray-700' 
          />
          <p className='text-red-500  py-2'>{errorMessage}</p>
        <button 
          className='p-4 my-6 bg-red-700 w-full rounded-lg' 
        onClick={handleButtonClick}>
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}> 
        {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered? Sign In Now..."}
        
        </p>
      </form>
    </div>
  )
}

export default Login