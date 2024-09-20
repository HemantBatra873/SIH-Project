import React, { useState } from 'react';
import { auth, firestore } from '../service/firebaseconfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, sendPasswordResetEmail } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import museumImage from '../assets/museumphoto.jpg';


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
    <div className="flex h-screen bg-gray-900 text-white">
      <div className="flex flex-col justify-center w-1/2 p-8">
        <h1 className="text-4xl mb-4 text-center">Welcome to Science Museum 🎟️</h1>
        <h2 className="text-3xl mb-4 text-center">{isSignUp ? 'Sign Up' : 'Login to get Started'}</h2>

        {/* Email Input */}
        <input
          type="email"
          className="p-2 border border-gray-700 rounded mb-4 bg-gray-800 text-sm text-white max-w-xs mx-auto block"
          placeholder="📧 Email :"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password Input */}
        <input
          type="password"
          className="p-2 border border-gray-700 rounded mb-4 bg-gray-800 text-sm text-white max-w-xs mx-auto block"
          placeholder="🔒 Password :"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 
         {/* Forgot Password */}
         <div className="text-center mb-4">
          <button
            className="text-blue-600 underline"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </button>
        </div>

        {/* Sign-Up or Login Button */}
        {isSignUp ? (
          <button
            onClick={handleSignUp}
            className="dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 rounded mb-4 max-w-xs mx-auto block"
          >
            Sign Up here
          </button>
        ) : (
          <button
            onClick={handleEmailSignIn}
            className="dark:bg-blue-600 dark:hover:bg-blue-700 text-white p-2 rounded mb-4 max-w-xs mx-auto block"
          >
            Login here
          </button>
        )}

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="dark:bg-purple-600 dark:hover:bg-purple-700 text-white p-2 rounded max-w-xs mx-auto block"
        >
          Sign In with Google
        </button>

        {/* Switch between Sign-Up and Login */}
        <p className="mt-4 text-center">
          {isSignUp ? 'Already have an account?' : 'No account yet?'}
          <button
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-blue-600 underline ml-2"
          >
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
        </p>
      </div>

      {/* Right Section with Museum Image */}
      <div className="w-1/2 flex items-center justify-center">
        <img
          src={museumImage} //imported image
          alt="Museum"
          className="object-contain h-3/4 max-w-full mt-24 rounded-md "
        />
      </div>
    </div>
  );
};

export default Login;
