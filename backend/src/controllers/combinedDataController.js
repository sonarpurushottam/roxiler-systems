import axios from 'axios';

export const getCombinedData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }

  try {
    // Define the API endpoints
    const statisticsUrl = `http://localhost:5000/api/statistics?month=${month}`;
    const barChartUrl = `http://localhost:5000/api/bar-chart?month=${month}`;
    const pieChartUrl = `http://localhost:5000/api/pie-chart?month=${month}`;

    // Fetch data from all three APIs concurrently
    const [statisticsResponse, barChartResponse, pieChartResponse] = await Promise.all([
      axios.get(statisticsUrl),
      axios.get(barChartUrl),
      axios.get(pieChartUrl),
    ]);

    // Combine the responses
    const combinedData = {
      statistics: statisticsResponse.data,
      barChart: barChartResponse.data,
      pieChart: pieChartResponse.data,
    };

    res.status(200).json(combinedData);
  } catch (error) {
    console.error('Error fetching combined data:', error);
    res.status(500).json({ error: 'Failed to retrieve combined data', details: error.message });
  }
};
