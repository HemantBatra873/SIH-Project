import { useState } from "react";
import Defaultpage from "../components/Defaultpage";
import Layout from "../components/Layout";

const Home = () => {
  const [isChatBoxOpen, setIsChatBoxOpen] = useState(true);
  const toggleChatBox = () => {
    setIsChatBoxOpen(!isChatBoxOpen);
  };

  return (
    <div className="flex justify-between">
      <Layout isChatBoxOpen={isChatBoxOpen} />
      <Defaultpage />
    </div>
  );
};

export default Home;
