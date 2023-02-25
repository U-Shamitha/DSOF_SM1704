import React from 'react'
import Questions from './Questions';

const QuestionList = ({questionsList}) => {

  // console.log(questionsList)
  return (
    <>
       {
            Array.from(questionsList).map((question) => (
                <Questions question={question} key={question._id} />
            ))
       } 
    </>
  )
}

export default QuestionList