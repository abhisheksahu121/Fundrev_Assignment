import React, { useState, useEffect } from "react";
import axios from "axios";
import Layout from "../components/Layout/Layout";

const Investor = () => {
  const [startupDetails, setStartupDetails] = useState([]);

  useEffect(() => {
    // Fetch startup details from the backend upon component mount
    fetchStartupDetails();
  }, []);

  const fetchStartupDetails = async () => {
    try {
      // Make an API call to fetch startup details
      const response = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/details`
      );
      setStartupDetails(response.data);
    } catch (error) {
      console.error("Error fetching startup details:", error);
    }
  };

  const handleInterestedClick = async () => {
    try {
      // Make an API call to indicate investor interest
      await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/interested`);
      alert("You have shown interest in this startup!");
    } catch (error) {
      console.error("Error showing interest:", error);
    }
  };

  return (
    <Layout>
      <h1>Welcome to Investor Page</h1>
      <div>
        <h2>Startup Details</h2>
        {startupDetails.map((startup, index) => (
          <div key={index}>
            <p>
              <strong>Company Name:</strong> {startup.companyName}
            </p>
            <p>
              <strong>Business Description:</strong>{" "}
              {startup.businessDescription}
            </p>
            <p>
              <strong>Revenue:</strong> {startup.revenue}
            </p>
            <button onClick={handleInterestedClick}>Interested</button>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Investor;
