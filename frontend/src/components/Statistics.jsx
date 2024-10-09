import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance.js';
import { Box, Typography, Card, CardContent, CardHeader, Divider } from '@mui/material';

const Statistics = ({ month }) => {
  const [statistics, setStatistics] = useState({
    totalSaleAmount: 0,
    totalSoldItems: 0,
    totalNotSoldItems: 0,
  });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    try {
      const response = await axiosInstance.get('/statistics', {
        params: { month },
      });
      console.log('Fetched statistics:', response.data);
      setStatistics(response.data);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" mt={4}>
      <Card elevation={4} sx={{ maxWidth: 400, width: '100%' }}>
        <CardHeader 
          title={`Statistics - ${month}`} 
          titleTypographyProps={{ variant: 'h5', textAlign: 'center', color: 'primary' }} 
        />
        <Divider />
        <CardContent>
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Total Sales Amount:
          </Typography>
          <Typography variant="h6" color="primary" gutterBottom>
          ₹ {statistics.totalSaleAmount?.toFixed(2) || 0}
          </Typography>
          <Divider />
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Total Sold Items:
          </Typography>
          <Typography variant="h6" color="success.main" gutterBottom>
            {statistics.totalSoldItems || 0}
          </Typography>
          <Divider />
          <Typography variant="body1" color="textSecondary" gutterBottom>
            Total Not Sold Items:
          </Typography>
          <Typography variant="h6" color="error.main" gutterBottom>
            {statistics.totalNotSoldItems || 0}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Statistics;
