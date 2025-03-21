import express from 'express';
import usercontroller from "../controllers/user.controller.js";
import Login from '../auth/login.auth.js';
import protectRoute from '../middleware/auth.Middelware.js';


const router = express.Router();

const {getUser,addUser,getUserById,updateUserById,deleteUserById} = usercontroller;



router.get('/get_user',protectRoute, getUser);
router.post('/add_user',protectRoute,addUser);
router.get('/get_user/:id',protectRoute,getUserById);
router.put('/update/:id',protectRoute,updateUserById)
router.delete('/delete/:id',protectRoute,deleteUserById)
router.post('/login',Login);

export default router;
