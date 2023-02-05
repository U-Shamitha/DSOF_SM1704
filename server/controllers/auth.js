import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

import users from '../models/auth.js'; //schema of database

export const signup = async (req,res) => {
    const { name, email, password } = req.body;
    try{
        const existingUser =  await users.findOne({ email })
        if(existingUser){
            return res.status(404).json({message: "User already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 12) 
        const newUser = await users.create({ name, email, password: hashedPassword }) //create new user in users collection of database and the response is stored in newUser
        const token = jwt.sign({email: newUser.email, id:newUser._id}, "test", { expiresIn: '1h'}) //for authentication
        res.status(200).json({result: newUser, token})
    }catch(error){
        console.log(error)
        console.log(error.message)
        res.status(500).json("Something went wrong...")
    }
}

export const login = async (req,res) => {

    const { email, password } = req.body;
    try{
        const existingUser =  await users.findOne({ email });
        if(!existingUser){
            return res.status(404).json({ message: "User doesn't exist" })
        }

        const isPasswordCrt = await bcrypt.compare(password, existingUser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message: "Invalid credentails"})
        }
        const token = jwt.sign({email: existingUser.email, id:existingUser._id}, "test", { expiresIn: '1h'}) //for authentication
        res.status(200).json({result: existingUser, token})

    }catch(error){
        console.log(error)
        console.log(error.message)
        res.status(500).json("Something went wrong...")
    }

}