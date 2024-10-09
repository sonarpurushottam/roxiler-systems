import Product from '../models/Product.js';

export const getPieChartData = async (req, res) => {
  const { month } = req.query;

  if (!month) {
    return res.status(400).json({ error: "Month is required" });
  }

  try {
    // Get the month number (0-11 for Jan-Dec)
    const monthNumber = new Date(Date.parse(month + " 1, 2021")).getMonth();

    // Define the date range for the specified month across both years
    const startDate2021 = new Date(2021, monthNumber, 1);
    const endDate2021 = new Date(2021, monthNumber + 1, 1);
    const startDate2022 = new Date(2022, monthNumber, 1);
    const endDate2022 = new Date(2022, monthNumber + 1, 1);

    // Fetch products sold in the specified month across both years
    const products = await Product.find({
      $or: [
        { dateOfSale: { $gte: startDate2021, $lt: endDate2021 } },
        { dateOfSale: { $gte: startDate2022, $lt: endDate2022 } }
      ]
    });

    // Count the items in each category
    const categoryCount = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {});

    // Convert the object to an array of key-value pairs
    const pieChartData = Object.keys(categoryCount).map(category => ({
      category,
      count: categoryCount[category],
    }));

    res.status(200).json(pieChartData);
  } catch (error) {
    console.error('Error fetching pie chart data:', error);
    res.status(500).json({ error: 'Failed to retrieve pie chart data', details: error.message });
  }
};
