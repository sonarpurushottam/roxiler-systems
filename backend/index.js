import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import {initializeDatabase} from './src/controllers/productController.js'; 
import productRoutes from './src/routes/productRoutes.js';
import statisticsRoutes from './src/routes/statisticsRoutes.js';
import barChartRoutes from './src/routes/barChartRoutes.js';
import pieChartRoutes from './src/routes/pieChartRoutes.js';
import combinedDataRoutes from './src/routes/combinedDataRoutes.js';

dotenv.config();
connectDB();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(
  cors({
    origin: true, // Allows all origins, can be restricted to specific domains if needed
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
initializeDatabase();
app.use('/api/products', productRoutes);
app.use('/api/statistics', statisticsRoutes);
app.use('/api/bar-chart', barChartRoutes);
app.use('/api/pie-chart', pieChartRoutes);
app.use('/api/combined-data', combinedDataRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
