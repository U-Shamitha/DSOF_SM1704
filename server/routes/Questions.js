import express from 'express';

import {AskQuestion} from '../controllers/Questions.js'
import {getAllQuestions} from '../controllers/Questions.js' //gAQ 2
import {deleteQuestion, voteQuestion} from '../controllers/Questions.js' //dQ 2
import auth from '../middlewares/auth.js'


const router = express.Router();

router.post('/Ask', auth,  AskQuestion)
router.get('/get', getAllQuestions) //gAQ 1
router.delete('/delete/:id', auth, deleteQuestion)//dQ 1
router.patch('/vote/:id', auth, voteQuestion);

export default router;