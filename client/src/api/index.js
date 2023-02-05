import axios from 'axios'

const API = axios.create({baseURL: 'http://localhost:5000'})

export const logIn = (authData) => API.post('/user/login', authData).then(console.log(" posted to login"));
export const signUp = (authData) => API.post('/user/signup', authData).then(console.log(" posted to signup"));