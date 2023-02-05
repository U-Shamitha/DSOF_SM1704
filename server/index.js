import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import userRoutes from './routes/Users.js'

const app = express();
app.use(express.json({limit: "30mb", extended: true})) //reply to request with the help of json
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors()) //to eliminate the error caused when one port sends request to other, cors is used as middleware

app.get('/',(req,res) => {
    res.send("This is a stack overflow clone API")
})

//api for authentication
app.use('/user', userRoutes) //userRoutes is middle ware it contains lot of options for path after "/user"

const PORT = process.env.PORT || 5000 

const CONNECTION_URL = 'mongodb+srv://admin:admin@stack-overflow-clone.s11m3np.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => {console.log(`server running on ${PORT}`)}))
.catch((err) => console.log(err.message))