import express from 'express';
import { getCombinedData } from '../controllers/combinedDataController.js';

const router = express.Router();

// Define the combined data route
router.get('/', getCombinedData);

export default router;
