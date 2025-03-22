import express from 'express'

import productController from '../controllers/product.controller.js';
import protectRoute from '../middleware/auth.Middelware.js';
import authorizRolles from '../middleware/role.middleware.js';



const router = express.Router();


const {addProduct,getProduct,getProductById,updateProductById,deleteProductById} = productController

router.get('/get_product',protectRoute,authorizRolles('admin','user') , getProduct);
router.post('/add_product',protectRoute, authorizRolles('admin'), addProduct);
router.get('/get_product/:id',protectRoute,authorizRolles('admin','user'),getProductById)
router.put('/update/:id',protectRoute,authorizRolles('admin'), updateProductById)
router.delete('/delete/:id',protectRoute,authorizRolles('admin'), deleteProductById)


export default router;