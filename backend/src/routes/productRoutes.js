import express from 'express';
import { verificarToken } from '../middlewares/authMiddleware.js';
import { getAllProducts, getProductById } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:id', getProductById);

export default router;
