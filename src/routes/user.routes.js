import express from 'express';
import usercontroller from "../controllers/user.controller.js";
import Login from '../auth/login.auth.js';
import protectRoute from '../middleware/auth.Middelware.js';
import authorizRolles from '../middleware/role.middleware.js';


const router = express.Router();

const {getUser,addUser,getUserById,updateUserById,deleteUserById} = usercontroller;



router.get('/get_user',protectRoute,authorizRolles('admin'), getUser);
router.post('/add_user',protectRoute,authorizRolles('admin'),addUser);
router.get('/get_user/:id',protectRoute, authorizRolles('admin'),getUserById);
router.put('/update/:id',protectRoute,authorizRolles('user'), updateUserById);
router.delete('/delete/:id',protectRoute,authorizRolles('admin'), deleteUserById);
router.post('/login',Login);

export default router;
