import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth, db } from '../service/firebaseconfig';
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
// import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  // Sign in with Email and Password
  const handleEmailSignIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        storeUserData(user);
      })
      .catch((error) => {
        console.error("Error signing in with email:", error.message);
      });
  };

  // Sign in with Google
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        storeUserData(user);
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error.message);
      });
  };

  // Store user data in Firestore
  const storeUserData = async (user) => {
    await setDoc(doc(db, "users", user.uid), {
      name: user.displayName,
      email: user.email,
      profilePic: user.photoURL,
    });
    navigate('/home'); // Redirect to homepage
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-3xl md:text-4xl lg:text-4xl xl:text-5xl mb-4 md:mb-6 flex flex-col justify-center items-center text-center">
             Welcome to Science Museum 🎟️
        </h1>
        <h2 className="text-2xl md:text-3xl lg:text-3xl xl:text-3xl mb-4 md:mb-6 flex flex-col justify-center items-center text-center">
            Sign in to get started
        </h2>
      <form onSubmit={handleEmailSignIn} className="space-y-6 flex flex-col justify-center items-center  ">
        <input
          type="email"
          placeholder="Email"
          className="p-2 border rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Sign In with Email
        </button>

      <button
        onClick={handleGoogleSignIn}
        className="mt-6 px-4 py-2 bg-red-500 text-white rounded"
        
      >
        {/* <FcGoogle className='h-7 w-7' /> */}
        Sign In with Google 
      </button>
      </form>
    </div>
  );
};

export default Login;
