import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../service/firebaseconfig";
import { signOut } from "firebase/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLandmark } from "@fortawesome/free-solid-svg-icons";

const Header = ({ toggleSidebar }) => {
  const [user, setUser] = useState(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    // Check if user data is stored in local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser) {
      // If user data exists in local storage, set it
      setUser(storedUser);
    } else {
      // If no local storage data, listen to auth changes
      const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
        if (firebaseUser) {
          // Store user in localStorage when logged in
          const userData = {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName || firebaseUser.email,
            photoURL:
              firebaseUser.photoURL ||
              "https://lh3.googleusercontent.com/a/ACg8ocJBbc53H1upARwmh_3vqbAQmWQ1c5sNQindUPsjYo1rUaPW5Q=s96-c",
          };
          localStorage.setItem("user", JSON.stringify(userData));
          setUser(userData); // Set user state
        }
      });
      return () => unsubscribe();
    }
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        localStorage.removeItem("user"); // Remove user data from local storage
        setDropdownVisible(false); // Hide dropdown on logout
      })
      .catch((error) => {
        console.error("Error logging out:", error.message);
      });
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="h-full min-h-16 flex justify-between items-center mx-auto p-2 md:p-4 max-w-1xl">
        <div className="inline-flex items-center">
          <button
            className="text-2xl sm:text-3xl md:text-4xl p-2 transition bg-white rounded-full hover:shadow-xl focus:shadow-lg"
            type="button"
            onClick={toggleSidebar}
          >
            <FontAwesomeIcon icon={faLandmark} />
          </button>
          <Link to="/home">
            <h1 className="font-head text-xl sm:text-2xl md:text-4xl font-semibold ml-2">
              Science Museum
            </h1>
          </Link>
        </div>

        {user ? (
          <div className="relative">
            <img
              src={user.photoURL}
              alt="Profile"
              className="w-10 h-10 rounded-full cursor-pointer"
              onClick={toggleDropdown}
            />
            {dropdownVisible && (
              <div className="absolute right-0 mt-2 p-2 border rounded shadow-lg  bg-blue-700 ">
                <Link to={"/"}>
                  <button
                    onClick={handleLogout}
                    className="text-white bg-blue-700 "
                  >
                    Logout
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <Link to="/">
            <button className="px-4 py-2 bg-blue-600 text-white rounded">
              Login
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
