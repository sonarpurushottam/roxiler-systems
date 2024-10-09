import Product from '../models/Product.js';

export const getBarChartData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }

  try {
    // Get the month number (0-11 for Jan-Dec)
    const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth();

    // Define the date ranges for the specified month across both years
    const startDate2021 = new Date(2021, monthNumber, 1);
    const endDate2021 = new Date(2021, monthNumber + 1, 1);
    const startDate2022 = new Date(2022, monthNumber, 1);
    const endDate2022 = new Date(2022, monthNumber + 1, 1);

    // Fetch products sold in the specified month across both years
    const products = await Product.find({
      $or: [
        { dateOfSale: { $gte: startDate2021, $lt: endDate2021 } },
        { dateOfSale: { $gte: startDate2022, $lt: endDate2022 } },
      ],
    });

    // Initialize price ranges
    const priceRanges = [
      { range: "0 - 100", count: 0 },
      { range: "101 - 200", count: 0 },
      { range: "201 - 300", count: 0 },
      { range: "301 - 400", count: 0 },
      { range: "401 - 500", count: 0 },
      { range: "501 - 600", count: 0 },
      { range: "601 - 700", count: 0 },
      { range: "701 - 800", count: 0 },
      { range: "801 - 900", count: 0 },
      { range: "901-above", count: 0 },
    ];

    // Categorize products into price ranges
    products.forEach(product => {
      const price = product.price;

      if (price <= 100) {
        priceRanges[0].count++;
      } else if (price <= 200) {
        priceRanges[1].count++;
      } else if (price <= 300) {
        priceRanges[2].count++;
      } else if (price <= 400) {
        priceRanges[3].count++;
      } else if (price <= 500) {
        priceRanges[4].count++;
      } else if (price <= 600) {
        priceRanges[5].count++;
      } else if (price <= 700) {
        priceRanges[6].count++;
      } else if (price <= 800) {
        priceRanges[7].count++;
      } else if (price <= 900) {
        priceRanges[8].count++;
      } else {
        priceRanges[9].count++;
      }
    });

    res.status(200).json(priceRanges);
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    res.status(500).json({ error: 'Failed to retrieve bar chart data', details: error.message });
  }
};
