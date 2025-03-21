import express from 'express'

import productController from '../controllers/product.controller.js';
import protectRoute from '../middleware/auth.Middelware.js';



const router = express.Router();


const {addProduct,getProduct,getProductById,updateProductById,deleteProductById} = productController

router.get('/get_product',protectRoute, getProduct);
router.post('/add_product',protectRoute,addProduct);
router.get('/get_product/:id',protectRoute,getProductById)
router.put('/update/:id',protectRoute,updateProductById)
router.delete('/delete/:id',protectRoute,deleteProductById)

export default router;