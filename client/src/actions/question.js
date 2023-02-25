import React from 'react'
import * as api from '../api'

export const askQuestion = (questionData, navigate) => async(dispatch) => {
  try{
    const {data} = await api.postQuestion(questionData)
    dispatch({type: "POST_QUESTION", payload: data})
    dispatch(fetchAllQuestions())
    navigate('/')
  }catch(error){
    console.log(error)
  }
}

//gAQ 5
export const fetchAllQuestions = () => async(dispatch) => {
  try{
    // console.log("Fetched data") //printing to compensate delay
    const { data } = await api.getAllQuestions()
    dispatch({ type: 'FETCH_ALL_QUESTIONS', payload: data})
  }catch(error){
    // console.log('actions catch')
    console.log(error.message)
  }
}


//dQ 5
export const deleteQuestion = (id, navigate) => async (dispatch) => {

  try{
    const { data } = api.deleteQuestion(id) 
    dispatch(fetchAllQuestions())
    navigate('/')
  }catch (error){
    console.log(error)
  }

}

export const voteQuestion = (id, value, userId) => async (dispatch) => {
  try{
    const {data} = await api.voteQuestion(id, value, userId);
    dispatch(fetchAllQuestions())
  }catch (error) { 
    console.log(error)
  }
}

//Answer-6
export const postAnswer = (answerdata) => async(dispatch) => {

  try{
    const {id, noOfAnswers, answerBody, userAnswered, userId} = answerdata;
    // console.log(userId+" in action question")
    const {data} = await api.postAnswer(id, noOfAnswers, answerBody, userAnswered, userId);
    dispatch({type: 'POST_ANSWER', payload: data});
    dispatch(fetchAllQuestions())
  }catch(error){
    console.log(error)
  }
  
}


export const deleteAnswer = (id, answerId, noOfAnswers) => async(dispatch) => {
  try{
    const {data} = await api.deleteAnswer(id, answerId, noOfAnswers)
    dispatch(fetchAllQuestions())
  }catch(error){
    console.log(error)
  }
}



