import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import {register} from './controllers/auth.js';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
import postRoutes from './routes/posts.js';
import { verifyToken } from "./middleware/auth.js";
import { createPost } from "./controllers/posts.js";
import { getUserPost } from "./controllers/userPost.js";
import User from './models/User.js';
import Post from './models/Post.js';
import { users, posts } from './data/index.js';


// CONFIGURATIONS

const __filename = fileURLToPath(import.meta.url); //to grab file url
const __dirname = path.dirname(__filename); // for modules
dotenv.config(); // environment variables file
const app = express(); //create express application
app.use(express.json()) //invoke express app
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit:"30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'public/assets'))); //set the directory for storing assets generally cloud storage should be  used


// FILE STORAGE

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, "public/assets");
    },
    filename: function (req, file, cb){
        cb(null, file.originalname);
    }
});
const upload = multer({ storage }); // the varaiable will be used whenever we want to upload a file


// ROUTES WITH FILES

app.post("/auth/register", cors(),upload.single("picture"), register );
app.post("/posts", verifyToken, cors(), upload.single("picture"), createPost);
app.get("/userPost/:postId", getUserPost);


// ROUTES 

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);





// MONGOOSE SETUP

const PORT = process.env.PORT || 5000 ;
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>{
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));

    //inserting dummy data
    // User.insertMany(users);
    // Post.insertMany(posts);

}).catch((error)=> console.log(`${error} did not connect`))









