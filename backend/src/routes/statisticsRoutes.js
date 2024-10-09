import express from 'express';
import { getStatistics } from '../controllers/statisticsController.js';

const router = express.Router();

// Define the statistics route
router.get('/', getStatistics);

export default router;
