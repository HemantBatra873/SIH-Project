import React, { useState, useEffect } from "react";
import Defaultpage from "../components/Defaultpage";
import Layout from "../components/Layout";

const Home = () => {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(true);

  // Function to toggle the chat box
  const toggleChatBox = () => {
    setIsChatBoxOpen(!isChatBoxOpen);
  };

  // Function to close the chat box
  const closeChatBox = () => {
    setIsChatBoxOpen(false);
  };

  // Update the chat box state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setIsChatBoxOpen(false); // Close chat box on small screens by default
      } else {
        setIsChatBoxOpen(true); // Open chat box on larger screens by default
      }
    };

    handleResize(); // Set initial state based on current screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex justify-between">
      <Layout isChatBoxOpen={isChatBoxOpen} />
      <Defaultpage
        isChatBoxOpen={isChatBoxOpen}
        toggleChatBox={toggleChatBox}
        closeChatBox={closeChatBox}
      />
    </div>
  );
};

export default Home;
