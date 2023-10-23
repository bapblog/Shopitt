import express from 'express'
import { createProduct, getAllProducts, getProducts } from '../controllers/productController';
import { authChecker } from '../middleware/authChecker';

const router = express.Router();

router.get('/products',getAllProducts)
router.get('/products/all',getProducts)

router.post('/admin',authChecker,createProduct)

export default router;