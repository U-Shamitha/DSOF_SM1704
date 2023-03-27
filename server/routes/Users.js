import express  from "express";

import { login, signup } from "../controllers/auth.js" //".js" must be written as this is node.js 
import { getAllUsers, updateProfile, setUserSubscription, setUserQuestionLeft, setUserValidDay } from '../controllers/Users.js';
import auth from '../middlewares/auth.js'

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)

router.get('/getAllUsers', getAllUsers)
router.patch('/update/:id', auth, updateProfile)

router.patch('/setsubscription', setUserSubscription)
router.patch('/updatequestionsleft', setUserQuestionLeft)
router.patch('/updatevalidday', setUserValidDay)
router.patch('/updatemode', setUserValidDay)


export default router;