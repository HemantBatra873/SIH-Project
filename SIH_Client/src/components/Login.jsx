import React, { useState } from 'react';
import { auth, firestore } from '../service/firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import museumImage from '../assets/museumphoto.jpg';
import museum from '../assets/museum.jpg';
import museumm from '../assets/museumm.jpg';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

   // Function to save user data to local storage
   const saveUserToLocalStorage = (user) => {
    const userData = {
      email: user.email,
      displayName: user.displayName || user.email, // Use email if displayName is not available
      photoURL: user.photoURL || null, // Store photo if available
    };
    // Save user data as a string in local storage
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleSignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || user.email,
        photoURL: user.photoURL || null,
      });

      // Save user data to local storage
      saveUserToLocalStorage(user);

      navigate('/home');
    } catch (error) {
      console.error('Error during sign-up: ', error.code, error.message);
      alert('Sign-up failed. Please try again.');
    }
  };

  const handleEmailSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || user.email,
        photoURL: user.photoURL,
      });

      // Save user data to local storage
      saveUserToLocalStorage(user);

      navigate('/home');
    } catch (error) {
      console.error('Error signing in with email: ', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      await setDoc(doc(firestore, 'users', user.uid), {
        email: user.email,
        displayName: user.displayName || user.email,
        photoURL: user.photoURL || null,
      });

      // Save user data to local storage
      saveUserToLocalStorage(user);

      navigate('/home');
    } catch (error) {
      console.error('Error signing in with Google: ', error);
      alert('Google sign-in failed. Please try again.');
    }
  };

  // Function to handle password reset
  const handleForgotPassword = async () => {
    if (!email) {
      alert('Please enter your email to reset your password.');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Please check your inbox.');
    } catch (error) {
      console.error('Error sending password reset email: ', error);
      alert('Failed to send password reset email. Please try again.');
    }
  };

  return (
    <div className="flex max-h-screen bg-gray-900 text-white">
      <div className="flex flex-col justify-center w-1/2 p-8 mt-20">
        <h1 className="text-4xl mb-4 text-center">Welcome to GAIL (India) Limited</h1>
        <div className='flex flex-col w-96 border rounded-xl self-center place-content-center place-items-center space-y-4 p-4 shadow-lg shadow-gray-400 mt-4'>
        <h2 className="text-3xl mb-4 text-center mt-4">{isSignUp ? 'Sign Up to get Started' : 'Hey, Sign In'}</h2>

        {/* Email Input */}
        <input
          type="email"
          className="p-2 border border-black rounded mb-4 text-sm text-black max-w-xs mx-auto block w-full"
          placeholder="📧 Email "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          className="p-2 border border-black rounded mb-4 text-sm text-black max-w-xs mx-auto block w-full"
          placeholder="🔒 Password "
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 
         {/* Forgot Password */}
         <div className="text-center mb-4">
          <button
            className="text-black underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign-Up or Login Button */}
        {isSignUp ? (
          <button
            onClick={handleSignUp}
            className="dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 rounded mb-4 max-w-xs mx-auto block w-full"
          >
            Sign Up 
          </button>
        ) : (
          <button
            onClick={handleEmailSignIn}
            className="dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 rounded mb-4 max-w-xs mx-auto block w-full"
          >
            Sign In
          </button>
        )}

        {/* Switch between Sign-Up and Login */}
        <p className=" text-center text-gray-600">
          {isSignUp ? 'Already have an account?' : 'No account yet?'}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-black underline ml-2"
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>

        {/* Divider */}
        <div className="flex items-center justify-center mb-2 mt-2">
          <div className="w-32 border-t border-gray-600"></div>
          <span className="mx-4 text-gray-600">OR</span>
          <div className="w-32 border-t border-gray-600"></div>
        </div>


        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="dark:bg-purple-600 dark:hover:bg-purple-700 text-white p-2 rounded max-w-xs mx-auto flex gap-2 items-center justify-center w-full "
        >
          <FcGoogle className='h-6 w-6 border rounded-full'/>
           Continue with Google
        </button>
      </div>
      </div>

    {/* Right Section with Museum Image */}
    <div className="grid grid-rows-3 grid-flow-col gap-4 w-1/2 p-8 mt-20">
      <div className="row-span-3 col-span-1 ">
        <img
         src={"https://www.gailonline.com/images/about/Vision.jpg"} // Image 1
         alt="Dolomite Alps"
         className="w-full h-full object-cover shadow-lg shadow-gray-800 rounded-lg transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className='col-span-1'>
        <img
         src={"https://cdn.zeebiz.com/sites/default/files/2017/03/03/15341-gail-india-official-website.jpg"} // Image 2
         alt="Iceland"
         className="w-full h-full object-cover shadow-lg shadow-gray-800 rounded-lg transition-all duration-300 hover:scale-105"
        />
      </div>
      <div className='row-span-2 col-span-1 '>
        <img
         src={"https://etimg.etb2bimg.com/photo/77844952.cms"} // Image 3
         alt="Ethiopia"
         className="w-full h-full object-cover shadow-lg shadow-gray-800 rounded-lg transition-all duration-300 hover:scale-105"
        />
      </div>
    </div>

    </div>
  );
};

export default Login;
