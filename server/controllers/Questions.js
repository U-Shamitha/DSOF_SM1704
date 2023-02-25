import Questions from '../models/Questions.js'
import mongoose from 'mongoose';

export const AskQuestion = async(req,res) => {
    const postQuestionData = req.body;
    const postQuestion = new Questions({...postQuestionData})
    try{
        await postQuestion.save();
        res.status(200).json("Posted the question successfully")
    }catch(error){
        console.log(error.message)
        res.status(400).json("Couldn't post the question")
    }
}

//gAQ 3

export const getAllQuestions = async (req, res) => {
    try{
        // console.log('controller try')
        const  questionList = await Questions.find();
        // console.log(questionList)
        res.status(200).json(questionList);
    }catch(error){
        console.log('controller catch')
        res.status(404).json({message: error.message});
    }
}

//dQ 3
export const deleteQuestion = async (req,res) => {
    const { id:_id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Answer unavailable...')
    }

    try{   
        await Questions.findByIdAndRemove(_id);
        res.status(200).json({message: "Successfully deleted..."})
    }catch(error){
        res.status(404).json({message : error.message})
    }
}

export const voteQuestion = async(req, res) => {
    const { id: _id } = req.params;
    const { value, userId } = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('Question unavailable...')
    }

    try{
        const question = await Questions.findById(_id)
        const upIndex = question.upVote.findIndex((id) => id === String(userId))
        const downIndex = question.downVote.findIndex((id) => id === String(userId))

        if( value === 'upVote'){
            if(downIndex !== -1){ //if already downVoted then remove the user from downVote array
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
            if(upIndex === -1){ // if newUser push the user to upVote array
                question.upVote.push(userId)
            }else{ // if already upVoted the remove the user from upVote array
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
        }

        if( value === 'downVote'){
            if(upIndex !== -1){ //if already upVoted then remove the user from upVote array
                question.upVote = question.upVote.filter((id) => id !== String(userId))
            }
            if(downIndex === -1){ // if newUser push the user to downVote array
                question.downVote.push(userId)
            }else{ // if already downVoted the remove the user from downVote array
                question.downVote = question.downVote.filter((id) => id !== String(userId))
            }
        }

        await Questions.findByIdAndUpdate(_id, question);
        res.status(200).json({message: "Voted successfully..."})

    }catch(error){
        res.status(404).json({message: "id not found"})
    }
}
