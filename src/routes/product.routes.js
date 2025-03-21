import express from 'express'

import productController from '../controllers/product.controller.js';



const router = express.Router();


const {addProduct,getProduct,getProductById,updateProductById,deleteProductById} = productController

router.get('/get_product',getProduct);
router.post('/add_product',addProduct);
router.get('/get_product/:id',getProductById)
router.put('/update/:id',updateProductById)
router.delete('/delete/:id',deleteProductById)

export default router;