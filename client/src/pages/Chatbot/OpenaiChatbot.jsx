import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from 'axios';

import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import { createChatCompletion } from "../../api";
import fetchData from "./fetchData";
import './OpenaiChatbot.css';
import lens from '../../assets/search-solid.svg';
import spinner from '../../assets/spinner.gif';

function OpenaiChatbot() {

    const User = useSelector((state) => (state.currentUserReducer))

    const [prompt, updatePrompt] = useState(undefined);
    const [loading, setLoading] = useState(false);
    const [answer, setAnswer] = useState(undefined);
    const [otp, setOtp] = useState('');
    const [otpPage, setOtpPage] = useState(true);
    const [otpSent, setOtpSent] = useState(false);

    useEffect(() => {
        if (prompt != null && prompt.trim() === "") {
          setAnswer(undefined);
        }
      }, [prompt]);

    const getOtp = async () => {
      // if (event.key !== "Enter") {
      //   return;
      // }
      try{
        const res = await fetch(
          "http://localhost:5000/otp/send-otp",
          { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              email: User?.result?.email,
              subject: "verify email through otp",
              message: "This is your otp to get access for asking question to chatbot"
            })
          }
        )

        if (!res.ok){
          setOtpSent(true);
        }

      }
      catch(err){
         console.log(err);
      }

    }

    const verifyOtp = async () => {
      // if (event.key !== "Enter") {
      //   return;
      // }
      try{
        const res = await fetch(
          "http://localhost:5000/otp/verify-otp",
          { 
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
              email: User?.result?.email,
              otp: otp
            })
          }
        )
        console.log(res);
        const {valid}  = await res.json();
        console.log(valid);
        if(valid){
          setOtpPage(false);
        }

      }
      catch(err){
         console.log(err);
      }

    }


    const sendPrompt = async (event) => {
        if (event.key !== "Enter") {
          return;
        }
        console.log('prompt', prompt)
        try {
            setLoading(true);
        
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ prompt }),
            };
        
            const res = await fetch("/create-chat-completion", requestOptions);
            if (!res.ok) {
                throw new Error("Something went wrong");
              }
          
              const { message } = await res.json();
              console.log(message);
              setAnswer(message);

          } catch (err) {
            console.error(err, "err");
          }finally {
            setLoading(false);
          }
      }
  
    return (
        <div className='home-container-1'>
            <span className='leftSideBarHide' ><LeftSidebar /></span>
            <div className='home-container-2' >
                <h1 className="h1Sp">Chatbot</h1>
                <div className="app">
                    
                    {!otpPage &&
                      <div className="app-container" style={{width:'90%'}}>
                        <div className="spotlight__wrapper">
                            <input
                                type="text"
                                className="spotlight__input"
                                placeholder="Ask me anything..."
                                disabled={loading}
                                style={{
                                  backgroundImage: loading ? `url(${spinner})` : `url(${lens})`,
                                }}
                                onChange={(e) => updatePrompt(e.target.value)}
                                onKeyDown={(e) => sendPrompt(e)}
                            />
                            <div className="spotlight__answer">{answer && <p>{answer}</p>}</div>
                          </div>
                      </div>
                    }

                    {otpPage && (

                      <div  className="spotlight__otp">
                        <div>Enter otp to ask Question to chatbot</div>
                        <div><input type="text" placeholder="enter otp here" onChange={(e)=>setOtp(e.target.value)}/></div>
                        <div>
                          <button onClick={getOtp}>Get OTP</button>
                          <button onClick={verifyOtp}>Verify</button>
                        </div>
                        {otpSent && <span>OTP sent</span>}
                      </div>

                    )}

                </div>
        </div>  
    </div>


        
    );
  }

  export default OpenaiChatbot;

