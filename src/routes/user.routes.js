import express from 'express';
import usercontroller from "../controllers/user.controller.js";


const router = express.Router();

const {getUser,addUser,getUserById,updateUserById,deleteUserById} = usercontroller;



router.get('/get_user',getUser);
router.post('/add_user',addUser);
router.get('/get_user/:id',getUserById);
router.put('/update/:id',updateUserById)
router.delete('/delete/:id',deleteUserById)


export default router;
