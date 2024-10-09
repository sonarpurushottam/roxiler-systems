import { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import axiosInstance from '../api/axiosInstance.js';
import { Box, Paper } from '@mui/material';

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState({
    series: [],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      xaxis: {
        categories: [],
      },
      title: {
        text: `Transactions Bar Chart for ${month}`,
      },
    },
  });

  useEffect(() => {
    fetchChartData();
  }, [month]); // React to changes in month

  const fetchChartData = async () => {
    try {
      const response = await axiosInstance.get('/bar-chart', {
        params: { month },
      });
      console.log('Fetched chart data:', response.data);
      prepareChartData(response.data); // Prepare data for chart
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  const prepareChartData = (data) => {
    if (!Array.isArray(data) || data.length === 0) {
      console.error('No data available for chart');
      return;
    }

    const categories = data.map(item => item.range); // Using 'range' for categories
    const values = data.map(item => item.count); // Using 'count' for values

    // Update chart data state
    setChartData({
      series: [{
        name: 'Number of Items',
        data: values,
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350,
        },
        xaxis: {
          categories,
        },
        title: {
          text: `Bar Chart Stats - ${month}`, // Update title with the current month
        },
      },
    });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      mt={4}
    >
      <Paper elevation={3} sx={{ padding: 3, width: '100%', maxWidth: 800 }}>
      
        <Chart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
        />
      </Paper>
    </Box>
  );
};

export default BarChart;
