import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv'

import userRoutes from './routes/Users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'//Answer-2

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true})) //reply to request with the help of json
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors()) //to eliminate the error caused when one port sends request to other, cors is used as middleware

app.get('/',(req,res) => {
    res.send("This is a stack overflow clone API")
})

//api for authentication
app.use('/user', userRoutes) //userRoutes is middle ware it contains lot of options for path after "/user"
app.use('/questions', questionRoutes)//ask ang get qestions
app.use('/answer', answerRoutes)//Answer-1

const PORT = process.env.PORT || 5000 

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => {console.log(`server running on ${PORT}`)}))
.catch((err) => console.log(err.message))