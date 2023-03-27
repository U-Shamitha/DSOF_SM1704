import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import moment from 'moment';

import './AskQuestion.css'
import { askQuestion } from '../../actions/question'
import { setMode, setQuestionsLeft, setValidDay } from '../../actions/users'
import { setCurrentUser } from '../../actions/CurrentUser';


const AskQuestion = () => {

  const [questionTitle, setQuestionTitle] = useState('')
  const [questionBody, setQuestionBody] = useState('')
  const [questionTags, setQuestionTags] = useState('')
  // const [quesLeft, setQuesLeft] = useState(() => {
  //   return localStorage.getItem("quesLeft");
  // });


  const User = useSelector((state) => (state.currentUserReducer));
  console.log(User?.result?.subscriptionDetails)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const subEndDate = moment(User?.result?.subscriptionDetails.subscribedOn).add(30, 'days').format('YYYY-MM-DD');
  const  currentDate = moment().format('YYYY-MM-DD');
  const validDay = moment(User?.result?.subscriptionDetails.validDay).format('YYYY-MM-DD');

  console.log('subEndDate: '+subEndDate);
  console.log('currentDate: '+currentDate);
  console.log('validDay: '+validDay);
  console.log(moment(currentDate).isSameOrBefore(subEndDate));



  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("in handle submit")

    //if active subscription
    if(moment(currentDate).isSameOrBefore(subEndDate) && User?.result?.subscriptionDetails.mode !== "1" ){
      console.log("active subscription")

      //if unlimited quota
      if(User?.result?.subscriptionDetails.mode === "3" ){

        if(questionBody){

          dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id}, navigate)) //optional selector '?' shows info when not able to fetch
        
        }
        return;

      }

      //if limited quota 5qpd
      if(User?.result?.subscriptionDetails.mode === "2" ){

        console.log("mode 2")

        //not upadted to current day quota
        if(moment(validDay).isBefore(currentDate)){

            console.log("not updated to current day quota")
      
            dispatch(setQuestionsLeft(User?.result?._id, 5));
            dispatch(setValidDay(User?.result?._id, currentDate));

            User.result.subscriptionDetails.noOfQuestionsLeft = 5;
            User.result.subscriptionDetails.validDay = currentDate;
            localStorage.setItem('Profile', JSON.stringify(User));
            // dispatch(setCurrentUser({User}));
            // console.log(User.result.subscriptionDetails);
          
        }
       

        //updated to current day
        else{

          //if quota completed
          if ((User?.result?.subscriptionDetails.noOfQuestionsLeft <= 0 && moment(currentDate).isSame(validDay)) || moment(validDay).isAfter(currentDate)) {

            alert(
              "Maximum number of questions already asked! \n Please Upgrade your plan"
            );
            navigate("/Subscription");
            return;

          }


          //quota not completed
          else if(moment(validDay).isSame(currentDate)){
            
            if (questionBody) {
            
              dispatch(setQuestionsLeft(User?.result?._id, User?.result?.subscriptionDetails.noOfQuestionsLeft-1));
              // localStorage.setItem("quesLeft", parseInt(User?.result?.subscriptionDetails.noOfQuestionsLeft) - 1); 
              dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id}, navigate)) //optional selector '?' shows info when not able to fetch

              User.result.subscriptionDetails.noOfQuestionsLeft -= 1;
              localStorage.setItem('Profile', JSON.stringify(User));
              // dispatch(setCurrentUser({User}));
              // console.log(User.result.subscriptionDetails);


              if(User?.result?.subscriptionDetails.noOfQuestionsLeft <= 0){

                dispatch(setQuestionsLeft(User?.result?._id, 5));
                dispatch(setValidDay(User?.result?._id, moment(User?.result?.subscriptionDetails.validDay).add(1, 'days').format()));

                User.result.subscriptionDetails.noOfQuestionsLeft = 5;
                User.result.subscriptionDetails.validDay = moment(User?.result?.subscriptionDetails.validDay).add(1, 'days').format();
                localStorage.setItem('Profile', JSON.stringify(User));
                // dispatch(setCurrentUser({User}));
                // console.log("after changing validDay: "+User.result.subscriptionDetails);
              
              }
              
            }

          }

        }
          
      }

    }

    //subscription expired
    else {
      dispatch(setMode(User?.result?._id,"1"));
      //if free plan
      if(User?.result?.subscriptionDetails.mode === "1" ){
        console.log("mode 1")
        
        //not upadted to current day quota
        if(moment(validDay).isBefore(currentDate)){
          console.log("not updated to current day")

            dispatch(setQuestionsLeft(User?.result?._id, 1));
            dispatch(setValidDay(User?.result?._id, currentDate));

            User.result.subscriptionDetails.noOfQuestionsLeft = 1;
            User.result.subscriptionDetails.validDay = currentDate;
            // dispatch(setCurrentUser({User}));
            localStorage.setItem('Profile', JSON.stringify(User));
            // console.log(User?.result?.subscriptionDetails);
          
        }
       
        //updated to current day or after
        else {
          console.log("updated to current day")


          console.log((User?.result?.subscriptionDetails.noOfQuestionsLeft <= 0 && moment(currentDate).isSame(validDay)));
          console.log(moment(validDay).isAfter(currentDate));

          //if quota completed
          if ((User?.result?.subscriptionDetails.noOfQuestionsLeft <= 0 && moment(currentDate).isSame(validDay)) || moment(validDay).isAfter(currentDate)) {

            alert(
              "Maximum number of questions already asked! \n Please Upgrade your plan"
            );
            navigate("/Subscription");
            return;

          }


          //quota not completed
          else if(moment(validDay).isSame(currentDate)){
            console.log("quota not completed")

            if (questionBody) {
            
              dispatch(setQuestionsLeft(User?.result?._id, User?.result?.subscriptionDetails.noOfQuestionsLeft-1));
              // localStorage.setItem("quesLeft", parseInt(User?.result?.subscriptionDetails.noOfQuestionsLeft) - 1); 
              console.log("dispatched setQuestionsLeft");
              dispatch(askQuestion({questionTitle, questionBody, questionTags, userPosted: User.result.name, userId: User?.result?._id}, navigate)) //optional selector '?' shows info when not able to fetch
              console.log("dispatched askQuestion");

              User.result.subscriptionDetails.noOfQuestionsLeft -= 1;
              //dispatch(setCurrentUser({User}));
              localStorage.setItem('Profile', JSON.stringify(User));
              // console.log(User?.result?.subscriptionDetails);

              if(User?.result?.subscriptionDetails.noOfQuestionsLeft-1 <= 0){

                  dispatch(setQuestionsLeft(User?.result?._id, 1));
                  dispatch(setValidDay(User?.result?._id, moment(User?.result?.subscriptionDetails.validDay).add(1, 'days').format()));
                  // console.log("dispatched setValidDay");
                
                  User.result.subscriptionDetails.noOfQuestionsLeft = 1;
                  User.result.subscriptionDetails.validDay = moment(User?.result?.subscriptionDetails.validDay).add(1, 'days').format();
                  // dispatch(setCurrentUser(User));
                  localStorage.setItem('Profile', JSON.stringify(User));
                  // console.log("after changing validDay: ");
                  // console.log(User.result.subscriptionDetails);

              }
              
            }

          }

        }
          
      }
      
      else{
        alert(
        "Subscription completed! \n Please Upgrade your plan"
        );
        navigate("/Subscription");
        return;
      }
      
    }

    // navigate('/')

  }


  const handleEnter = (e) => {
    if(e.key === 'Enter'){
      setQuestionBody(questionBody+"\n")
    }
  }
  
  
  return (
    <div className='ask-question'>
      <div className="ask-ques-container">
        <h1>Ask a public Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="ask-form-container">
            <label htmlFor='ask-ques-title'>
              <h4>Title</h4>
              <p>Be specific and imagine you're asking question to another person</p>
              <input type="text" id='ask-ques-title' onChange={(e) => {setQuestionTitle(e.target.value)}} placeholder='e.g. Is there an R function for finding the index of an element in a vector?'/>
            </label>
            <label htmlFor='ask-ques-body'>
              <h4>Body</h4>
              <p>Include all the information someone would need to answer your question</p>
              <textarea id="ask-ques-body" cols="30" rows="10" onChange={(e) => {setQuestionBody(e.target.value)}} onKeyPress={handleEnter}/>
            </label>
            <label htmlFor='ask-ques-tags'>
              <h4>Title</h4>
              <p>Add up to 5 tags to describe what your question is about</p>
              <input type="text" id='ask-ques-tags' onChange={(e) => {setQuestionTags(e.target.value.split(' '))}} placeholder='e.g. (xml typescript wordpress)'/>
            </label>
          </div>
          <input type='submit' value='Review your question' className='review-btn' />
        </form>
      </div>
    </div>
  )
}

export default AskQuestion