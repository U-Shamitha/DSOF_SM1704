import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    about: {type: String},
    tags: {type: [String]},
    joinedOn: {type: Date, default: Date.now},
    noOfQuestions:{type:Number, default:1},
    subscription:{type:String},
    subscriptionDetails: 
    {
        mode: {type: String, default: "1"},
        noOfQuestions: {type: Number, default: 1},
        subscribedOn: {type: Date, default: Date.now},
        noOfDaysLeft: {type: Number, default: 30},
        validDay: {type: Date, default: Date.now},
        noOfQuestionsLeft: {type: Number, default: 0}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
    }
    
})

export default mongoose.model("User", userSchema)