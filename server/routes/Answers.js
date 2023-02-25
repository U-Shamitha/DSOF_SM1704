//Answer-3
import express from "express";
import {postAnswer, deleteAnswer} from '../controllers/Answers.js'
import auth from '../middlewares/auth.js'

const router = express.Router();

router.patch('/post/:id', auth, postAnswer)//post - creating a new record, patch - updating the record
router.patch('/delete/:id', auth, deleteAnswer)//delete - deleting total record, patch - deleting specific object of the record

export default router;