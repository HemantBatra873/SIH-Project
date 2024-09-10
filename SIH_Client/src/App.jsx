import React, { useState } from 'react';
import './app.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import LeftSideBar from './components/LeftSideBar';
import Home from './pages/Home';
import Defaultpage from './components/Defaultpage';
import Layout from './components/Layout';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const [isChatBoxOpen, setIsChatBoxOpen] = useState(false);

  const toggleChatBox = () => {
    setIsChatBoxOpen(!isChatBoxOpen);
  };


  return (
    <BrowserRouter>
      {/* Header with toggleSidebar passed as prop */}
      <Header toggleSidebar={toggleSidebar} />

      {/* Sidebar component with isOpen and closeSidebar passed as props */}
      <LeftSideBar isOpen={isOpen} closeSidebar={closeSidebar} />
      
      {/* Main Content Area */}
      <div className="relative flex flex-col min-h-screen">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />

          </Routes>
        </div>
        {/* Layout and Defaultpage components */}
        <div className="flex-1 flex">
        <Layout isChatBoxOpen={isChatBoxOpen} />
        <Defaultpage />
      </div>

      </div>
    </BrowserRouter>
  );
}

export default App;
