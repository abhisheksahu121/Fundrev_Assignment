import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router";
const StartupRegister = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [revenue, setRevenue] = useState("");

  const navigate = useNavigate();
  //form function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/startupregister`,
        { userName, password, companyName, businessDescription, revenue }
      );
      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.success("Register Succesful");
    }
  };
  return (
    <Layout title="Startup-Register">
      <div className="startup">
        <h1>StartupRegister</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control"
              id="inlineFormInputGroup"
              placeholder="Username"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="form-control"
              id="inlineFormInputGroup"
              placeholder="CompanyName"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              className="form-control"
              id="inlineFormInputGroup"
              placeholder="businessDescription"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={revenue}
              onChange={(e) => setRevenue(e.target.value)}
              className="form-control"
              id="inlineFormInputGroup"
              placeholder="revenue"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default StartupRegister;
