import React from 'react';
import ChatBot from 'react-simple-chatbot';
import {Segment} from 'semantic-ui-react';
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';

const config = {
    width: "600px",
    height: "500px"
}

const ReactChatbot = () => {
    
    console.log(import.meta.env.VITE_Open_AI_Key);

    const steps = [
      {
        id: "Greet",
        message: "Hello, Welcome to our website",
        trigger: "Ask Name",
      },
      {
        id: "Ask Name",
        message: "Please enter your name",
        trigger: "waiting1",
      },
      {
        id: "waiting1",
        user: true,
        trigger: "Name",
      },
      {
        id: "Name",
        message: "Hi {previousValue}, Please select your issue",
        trigger: "issues",
      },
      {
        id: "issues",
        options: [
            {value: "React",label: "React",trigger: "React"},
            {value: "Angular",label: "Angular",trigger: "Angular"},
        ],
      },
      {
        id:'React',
        message:'Thanks for telling your React issue',
        end:true
      },
      {
        id:'Angular',
        message:'Thanks for telling your Angular issue',
        end:true
      }
    ];

  return (

    <div className='home-container-1'>
        <span className='leftSideBarHide' ><LeftSidebar /></span>
        <div className='home-container-2' style={{display:'flex', justifyContent:'space-around'}}>
            <div style={{marginTop:'75px'}}>
                <Segment >
                    <ReactChatbot steps={steps} {...config}/>
                </Segment>
            </div>
        </div>  
     </div>
 
  )
}

export default ReactChatbot