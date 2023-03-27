import mongoose from 'mongoose'
import User from '../models/auth.js'
import moment from 'moment'

export const getAllUsers = async(req,res) => {
    try{
        // console.log("before finding allUsers")
        const allUsers = await User.find();
        console.log(allUsers)
        const allUserDetails = [];
        allUsers.forEach(users => {
            allUserDetails.push({_id: users._id, name: users.name, about: users.about, tags: users.tags, joinedOn: users.joinedOn})  
        })
        res.status(200).json(allUserDetails);
    }catch(error){
        // console.log(error.message)
        res.status(404).json({message : error.message})
    }
}

export const updateProfile = async(req, res) => {
    const {id:_id} = req.params;
    const { name, about, tags} = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).send('User unavailable');
    }

    try{
        const updatedProfile = await User.findByIdAndUpdate(_id, {$set: {'name':name, 'about': about, 'tags':tags}}, {new: true}) //new: true - return the updated profile after updating
        res.status(200).json(updatedProfile)
    }catch(error){
        res.status(405).json({message: error.message})
    }
}

export const setUserSubscription = async (req, res) => {
    try {
        const { userId, type } = req.body;
        console.log(req.body)
        const user = await User.findById(userId);
        console.log(user)
        user.subscription = type;
        user.subscriptionDetails.mode = type;

        let noOfQuestions = 1; 
        if (type === "1") { noOfQuestions = 1 }
        if (type === "2") { noOfQuestions = 5 }
        if (type === "3") { noOfQuestions = 9999999999 }


        user.noOfQuestions = noOfQuestions;
        user.subscriptionDetails.noOfQuestionsLeft = noOfQuestions
        console.log('Date.now:')
        console.log(moment().format('YYYY-MM-DD'))
        if(type!="1"){
            user.subscriptionDetails.subscribedOn = moment().format('YYYY-MM-DD');
            user.subscriptionDetails.validDay = moment().format('YYYY-MM-DD');
        }
        await User.findByIdAndUpdate(userId, user)
        console.log("Updated user after subscription")
        console.log(user)
        res.status(200).json({ data: user })
    } catch (err) {
        console.log(err)
        res.status(500).json({ data: null })

    }
}

export const setUserQuestionLeft = async (req, res) => {
    try {
        console.log("in setUserQuestionLeft");
        const { userId, quesLeft } = req.body;
        const user = await User.findById(userId);
        user.noOfQuestions = quesLeft;
        user.subscriptionDetails.noOfQuestionsLeft = quesLeft;
        
        console.log(user)
        await User.findByIdAndUpdate(userId, user)
        res.status(200).json(user)
    } catch (err) { console.log(err) }
}

export const setUserValidDay = async (req, res) => {
    try {
        console.log("in setUserValidDay");
        const { userId, validDay } = req.body;
        console.log(validDay);
        const user = await User.findById(userId);
        user.subscriptionDetails.validDay = validDay;
        
        // console.log(user)
        await User.findByIdAndUpdate(userId, user)
        res.status(200).json(user)
    } catch (err) { console.log(err) }
}

export const setUserMode = async (req, res) => {
    try {
        console.log("in setUserMode");
        const { userId, mode } = req.body;
        console.log(mode);
        const user = await User.findById(userId);
        user.subscriptionDetails.mode = mode;
        
        // console.log(user)
        await User.findByIdAndUpdate(userId, user)
        res.status(200).json(user)
    } catch (err) { console.log(err) }
}
