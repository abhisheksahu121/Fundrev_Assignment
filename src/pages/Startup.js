import React, { useState, useRef } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import Chart from "chart.js/auto";

const Startup = () => {
    const monthlySales = {};
  const [file, setFile] = useState("");
  const [salesData, setSalesData] = useState([]);

  const chartRef = useRef(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  console.log("assign the value of file");
  const handleUpload = async () => {
    console.log("inside handle upload");
    try {
      console.log("file inside try");
      const formData = new FormData();
      formData.append("file", file);

      console.log(file);
      console.log("calling post request");

      // Upload file to server
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/upload-sales`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);
      // Process sales data
    //   setSalesData(response.data);
      const processedData = processSalesData(response.data);

      setSalesData(processedData);
      renderChart(monthlySales);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const processSalesData = (data) => {
    console.log("calculating the monthely shale");
    // Calculate monthly sales figures
    
    salesData.forEach((row) => {
      const date = new Date(row.orderdate);
      const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;
      if (monthlySales[monthYear]) {
        monthlySales[monthYear] += parseFloat(row.Sales);
      } else {
        monthlySales[monthYear] = parseFloat(row.Sales);
      }
    });
    console.log(monthlySales)
    return data;
  };
  const renderChart = (data) => {
    const ctx = chartRef.current.getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [data].map((item) => item.month),
        datasets: [
          {
            label: "Monthly Sales",
            data: [data].map((item) => item.Sales),
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  return (
    <Layout>
      <h1>Welcome to startup page</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Update Sales</button>
      {/* <Chart/> */}
      <canvas ref={chartRef} width="300" height="50"></canvas>
    </Layout>
  );
};

export default Startup;
