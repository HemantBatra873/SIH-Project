import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // Ensure BrowserRouter, Routes, Route are imported
import Header from './components/Header';  // Make sure Header is correctly imported
import LeftSideBar from './components/LeftSideBar';  // Correct import path for LeftSideBar
import Home from './pages/Home';  // Assuming you have a Home component
import Login from './pages/Login';  // Assuming you have a Login component
import About from './pages/About';  // Assuming you have an About component
import Defaultpage from './components/Defaultpage';  // Assuming you have a Defaultpage component

function App() {
  // Define state for sidebar toggle
  const [isOpen, setIsOpen] = useState(false);

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Function to close sidebar
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <BrowserRouter>
      {/* Header with toggleSidebar passed as prop */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar component with isOpen and closeSidebar passed as props */}
      <LeftSideBar isOpen={isOpen} closeSidebar={closeSidebar} />

      {/* Routes for different pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
      </Routes>

      {/* Default page component */}
      <Defaultpage />
    </BrowserRouter>
  );
}

export default App;
