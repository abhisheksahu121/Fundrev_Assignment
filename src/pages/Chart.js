import React, { useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import Layout from "../components/Layout/Layout";

const Chart = ({ children }) => {
  // const chartRef = useRef(null);
  console.log("inside chartjs");
  const [monthlySales, setMonthlySales] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const fetchData = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/upload-sales`
      );
      setMonthlySales({ children });
    } catch (error) {
      console.error("Error fetching sales data:", error);
    }
  };
  const handleChangeDateRange = () => {};
  return (
    <Layout>
      <h2>Sales Chart</h2>
      <button onClick={fetchData}>Fetch Data</button>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleChangeDateRange}>Change Date Range</button>
      <Bar
        data={{
          labels: Object.keys(monthlySales),
          datasets: [
            {
              label: "Monthly Sales",
              backgroundColor: "rgba(75,192,192,1)",
              borderColor: "rgba(0,0,0,1)",
              borderWidth: 2,
              data: Object.values(monthlySales),
            },
          ],
        }}
        options={{
          title: {
            display: true,
            text: "Monthly Sales Chart",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "bottom",
          },
        }}
      />
    </Layout>
  );
};

export default Chart;
