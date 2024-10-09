import express from 'express';
import { getBarChartData } from '../controllers/barChartController.js';

const router = express.Router();

// Define the bar chart route
router.get('/', getBarChartData);

export default router;
