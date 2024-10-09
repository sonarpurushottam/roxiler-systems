// import React, { useState, useEffect } from "react";
// import { CircularProgress, Box, Typography, Paper } from "@mui/material";
// import ApexCharts from "react-apexcharts";
// import axiosInstance from "../api/axiosInstance.js";

// const PieChart = ({ month }) => {
//   const [chartData, setChartData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPieChartData();
//   }, [month]);

//   const fetchPieChartData = async () => {
//     try {
//       setLoading(true);
//       const response = await axiosInstance.get("/pie-chart", {
//         params: { month },
//       });
//       const data = response.data;
//       setChartData(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching pie chart data:", error);
//       setLoading(false);
//     }
//   };

//   const getCategoryNames = () => chartData.map((item) => item.category);
//   const getCategoryCounts = () => chartData.map((item) => item.count);

//   const chartOptions = {
//     chart: {
//       type: "pie",
//     },
//     labels: getCategoryNames(),
//     responsive: [
//       {
//         breakpoint: 480,
//         options: {
//           chart: {
//             width: 300,
//           },
//           legend: {
//             position: "bottom",
//           },
//         },
//       },
//     ],
//     legend: {
//       position: "bottom",
//     },
//   };

//   return (
//     <Box
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       flexDirection="column"
//       mt={4}
//     >
//       <Typography variant="h5" component="h3" gutterBottom>
//         Sales by Category for {month}
//       </Typography>
//       <Paper elevation={3} sx={{ padding: 2, width: "100%", maxWidth: 600 }}>
//         {loading ? (
//           <CircularProgress />
//         ) : chartData.length > 0 ? (
//           <ApexCharts
//             options={chartOptions}
//             series={getCategoryCounts()}
//             type="pie"
//             width="100%"
//           />
//         ) : (
//           <Typography variant="body1" color="textSecondary">
//             No data available for {month}
//           </Typography>
//         )}
//       </Paper>
//     </Box>
//   );
// };

// export default PieChart;
import React, { useState, useEffect } from "react";
import { CircularProgress, Box, Typography, Paper } from "@mui/material";
import ApexCharts from "react-apexcharts";
import axiosInstance from "../api/axiosInstance.js";

const PieChart = ({ month }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // State for handling errors

  useEffect(() => {
    fetchPieChartData();
  }, [month]);

  const fetchPieChartData = async () => {
    setLoading(true);
    setError(null); // Reset error state on new fetch
    try {
      const response = await axiosInstance.get("/pie-chart", {
        params: { month },
      });
      const data = response.data;
      setChartData(data);
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
      setError("Failed to load data, please try again."); // Set error message
    } finally {
      setLoading(false);
    }
  };

  const getCategoryNames = () => chartData.map((item) => item.category);
  const getCategoryCounts = () => chartData.map((item) => item.count);

  const chartOptions = {
    chart: {
      type: "pie",
      toolbar: {
        show: false,
      },
    },
    labels: getCategoryNames(),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: {
      position: "bottom",
    },
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      mt={4}
    >
     <Typography variant="h2" component="h3" gutterBottom>
        Pie Chart
      </Typography>
      <Typography variant="h5" component="h3" gutterBottom>
        Sales by Category - {month}
      </Typography>
      <Paper elevation={3} sx={{ padding: 2, width: "100%", maxWidth: 600 }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : chartData.length > 0 ? (
          <ApexCharts
            options={chartOptions}
            series={getCategoryCounts()}
            type="pie"
            width="100%"
          />
        ) : (
          <Typography variant="body1" color="textSecondary">
            No data available for {month}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default PieChart;
