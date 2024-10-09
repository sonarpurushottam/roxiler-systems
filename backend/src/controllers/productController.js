import Product from "../models/Product.js";
import axios from "axios";

const initializeDatabase = async () => {
  try {
    const response = await axios.get('https://s3.amazonaws.com/roxiler.com/product_transaction.json');
    const products = response.data;

    // Optionally clear the existing data
    await Product.deleteMany();

    // Insert new data
    await Product.insertMany(products.map(product => ({
      id: product.id, // Use the id from the JSON
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      sold: product.sold,
      dateOfSale: product.dateOfSale,
    })));

    console.log('Database initialized with seed data');
  } catch (error) {
    console.error('Failed to initialize database:', error.message);
  }
};

export default initializeDatabase;


// const listTransactions = async (req, res) => {
//   const { month, search, page = 1, perPage = 10 } = req.query;
//   console.log(`Page: ${page}, Per Page: ${perPage}`);
//   try {
//     const query = {};
//     const monthsMapping = {
//       January: 0,
//       February: 1,
//       March: 2,
//       April: 3,
//       May: 4,
//       June: 5,
//       July: 6,
//       August: 7,
//       September: 8,
//       October: 9,
//       November: 10,
//       December: 11,
//     };

//     // Handle month filtering
//     if (month) {
//       const monthNumber = monthsMapping[month];

//       // Match transactions for both 2021 and 2022
//       query.$or = [
//         {
//           dateOfSale: {
//             $gte: new Date(2021, monthNumber, 1),
//             $lt: new Date(2021, monthNumber + 1, 1),
//           },
//         },
//         {
//           dateOfSale: {
//             $gte: new Date(2022, monthNumber, 1),
//             $lt: new Date(2022, monthNumber + 1, 1),
//           },
//         },
//       ];
//     }

//     // Handle search filtering

//     if (search) {
//       // Initialize search query
//       const searchQuery = [];
//       const searchRegex = new RegExp(search, "i"); // Case-insensitive regex

//       // Check for title and description
//       searchQuery.push({ title: searchRegex }, { description: searchRegex });

//       // Attempt to parse price as a number
//       const price = parseFloat(search);
//       if (!isNaN(price)) {
//         // If price is a valid number, add it to the search query
//         searchQuery.push({ price: price });
//       }

//       // Add to the query with $or
//       query.$or = searchQuery;
//     }

//     const totalItems = await Product.countDocuments(query);
//     const transactions = await Product.find(query)
//       .skip((page - 1) * perPage)
//       .limit(perPage);

//     res.status(200).json({
//       totalItems,
//       totalPages: Math.ceil(totalItems / perPage),
//       currentPage: page,
//       transactions,
//     });
//   } catch (error) {
//     console.error("Error retrieving transactions:", error);
//     res
//       .status(500)
//       .json({
//         error: "Failed to retrieve transactions",
//         details: error.message,
//       });
//   }
// };
const listTransactions = async (req, res) => {
  const { month, search, page = 1, perPage = 10 } = req.query;
  console.log(`Page: ${page}, Per Page: ${perPage}`);
  
  try {
    const query = {};
    const monthsMapping = {
      January: 0,
      February: 1,
      March: 2,
      April: 3,
      May: 4,
      June: 5,
      July: 6,
      August: 7,
      September: 8,
      October: 9,
      November: 10,
      December: 11,
    };

    // Handle month filtering
    if (month) {
      const monthNumber = monthsMapping[month];

      // Match transactions for both 2021 and 2022
      query.$or = [
        {
          dateOfSale: {
            $gte: new Date(2021, monthNumber, 1),
            $lt: new Date(2021, monthNumber + 1, 1),
          },
        },
        {
          dateOfSale: {
            $gte: new Date(2022, monthNumber, 1),
            $lt: new Date(2022, monthNumber + 1, 1),
          },
        },
      ];
    }

    // Handle search filtering
    if (search) {
      const searchQuery = [];
      const searchRegex = new RegExp(search, "i"); // Case-insensitive regex

      // Check for title and description
      searchQuery.push({ title: searchRegex }, { description: searchRegex });

      // Attempt to parse price as a number
      const price = parseFloat(search);
      if (!isNaN(price)) {
        // If price is a valid number, add it to the search query
        searchQuery.push({ price: price });
      }

      // Add to the query with $or
      query.$or = searchQuery;
    }

    const totalItems = await Product.countDocuments(query);
    const products = await Product.find(query)
      .skip((page - 1) * perPage)
      .limit(perPage);

    // Map the products to include the `id` from the dataset instead of `_id`
    const transactions = products.map(product => ({
      id: product.id, // Use the `id` from the product
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      sold: product.sold,
      dateOfSale: product.dateOfSale,
    }));

    res.status(200).json({
      totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      currentPage: page,
      transactions,
    });
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    res.status(500).json({
      error: "Failed to retrieve transactions",
      details: error.message,
    });
  }
};

export { initializeDatabase, listTransactions };
