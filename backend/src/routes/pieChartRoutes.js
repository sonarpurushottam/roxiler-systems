import express from 'express';
import { getPieChartData } from '../controllers/pieChartController.js';

const router = express.Router();

// Define the pie chart route
router.get('/', getPieChartData);

export default router;
