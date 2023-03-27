import axios from 'axios'

const API2 = axios.create({baseURL: 'https://stackoverflow-server-1ekf.onrender.com'})
const API = axios.create({baseURL: 'http://localhost:5000'})

// to provide security
API2.interceptors.request.use((req) => {
    if(localStorage.getItem('Profile')){
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile'))?.token}`
    }
    return req;
})

export const logIn = (authData) => API2.post('/user/login', authData);
export const signUp = (authData) => API2.post('/user/signup', authData);

export const postQuestion = (questionData) => API2.post('/questions/Ask', questionData)
export const getAllQuestions = () => API2.get('/questions/get') //gAQ4
export const deleteQuestion = (id) => API2.delete(`/questions/delete/${id}`) //dQ 4
export const voteQuestion = (id, value, userId) => API2.patch(`/questions/vote/${id}`, {value, userId})


//Answer-5
export const postAnswer = (id, noOfAnswers, answerBody, userAnswered, userId) => API2.patch(`/answer/post/${id}`, {noOfAnswers, answerBody, userAnswered, userId});
export const deleteAnswer = (id, answerId, noOfAnswers) => API2.patch(`/answer/delete/${id}`, {answerId, noOfAnswers})

export const fetchAllUsers = () => API2.get('/user/getAllUsers')
export const updateProfile = (id, updateData) => API2.patch(`/user/update/${id}`, updateData).then(console.log("req sent from api")).catch((e)=>(console.log(e)))

export const setSubscription = (userId, type) => API2.patch('/user/setsubscription', { userId, type })
export const updateQuestionsLeft = (userId, quesLeft) => API2.patch('/user/updatequestionsleft', { userId, quesLeft })
export const updateValidDay = (userId, validDay) => API2.patch('/user/updatevalidday', { userId, validDay })
export const updateMode = (userId, mode) => API2.patch('/user/updatemode', { userId, mode })

//openai chatbot
export const createChatCompletion = (input) => API2.post('create-chat-completion',{ input })