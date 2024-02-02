import React from "react";
import Layout from "./../components/Layout/Layout";
import { useNavigate } from "react-router";
const HomePage = () => {
  const navigate = useNavigate();
  const handleInvestor = () => {
    console.log(`Button investor clicked`);
    navigate("/investor");
  };
  const handleStartup = () => {
    console.log(`Button startup clicked`);
    navigate("/startup");
  };
  return (
    <Layout>
      <h1>HomePage</h1>
      <button onClick={handleInvestor} className="btn btn-primary">
        Investor
      </button>
      <button onClick={handleStartup} className="btn btn-primary">
        Startup
      </button>
    </Layout>
  );
};

export default HomePage;
