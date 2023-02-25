import axios from 'axios'

const API = axios.create({baseURL: 'https://stackoverflowserver-16g7.onrender.com'})

// to provide security
API.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile'))?.token}`
    }
    return req;
})

export const logIn = (authData) => API.post('/user/login', authData);
export const signUp = (authData) => API.post('/user/signup', authData);

export const postQuestion = (questionData) => API.post('/questions/Ask', questionData)
export const getAllQuestions = () => API.get('/questions/get') //gAQ4
export const deleteQuestion = (id) => API.delete(`/questions/delete/${id}`) //dQ 4
export const voteQuestion = (id, value, userId) => API.patch(`/questions/vote/${id}`, {value, userId})


//Answer-5
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API.patch(`/answer/post/${id}`, {noOfAnswers, answerBody, userAnswered, userId});
export const deleteAnswer = (id, answerId, noOfAnswers) => API.patch(`/answer/delete/${id}`, {answerId, noOfAnswers})

export const fetchAllUsers = () => API.get('/user/getAllUsers')
export const updateProfile = (id, updateData) => API.patch(`/user/update/${id}`, updateData).then(console.log("req sent from api")).catch((e)=>(console.log(e)))