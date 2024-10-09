import Product from '../models/Product.js';

export const getStatistics = async (req, res) => {
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

    // Query to get sold and not sold items in the selected month across both years
    const soldItems = await Product.find({
      $or: [
        { dateOfSale: { $gte: startDate2021, $lt: endDate2021 }, sold: true },
        { dateOfSale: { $gte: startDate2022, $lt: endDate2022 }, sold: true },
      ],
    });

    const notSoldItems = await Product.find({
      $or: [
        { dateOfSale: { $gte: startDate2021, $lt: endDate2021 }, sold: false },
        { dateOfSale: { $gte: startDate2022, $lt: endDate2022 }, sold: false },
      ],
    });

    // Calculate total sale amount for sold items
    const totalSaleAmount = soldItems.reduce((total, item) => total + item.price, 0);
    
    res.status(200).json({
      totalSaleAmount,
      totalSoldItems: soldItems.length,
      totalNotSoldItems: notSoldItems.length,
    });
  } catch (error) {
    console.error('Error fetching statistics:', error);
    res.status(500).json({ error: 'Failed to retrieve statistics', details: error.message });
  }
};
