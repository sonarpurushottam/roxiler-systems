import express from 'express';
import { initializeDatabase, listTransactions } from '../controllers/productController.js';


const router = express.Router();

router.get('/initialize', initializeDatabase);
router.get('/', listTransactions); // List transactions route


export default router;
