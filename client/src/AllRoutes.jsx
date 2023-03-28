import React from 'react'

import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Auth from './pages/Auth/Auth';
import Questions from './pages/Questions/Questions';
import AskQuestion from './pages/AskQuestion/AskQuestion';
import DisplayQuestion from './pages/Questions/DisplayQuestion';
import Tags from './pages/Tags/Tags';
import Users from './pages/Users/Users';
import UserProfile from './pages/UserProfile/UserProfile';
import LeftSideBarMenu from './components/LeftSidebar/LeftSideBarMenu ';
import Payment from './pages/Payment1/Payment';
import OpenaiChatbot from './pages/Chatbot/OpenaiChatbot';

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" exact element={<Home/>} />
      <Route path="/Auth" element={<Auth/>} />
      <Route path="/Questions" element={<Questions/>} />
      <Route path="/AskQuestion" element={<AskQuestion />} />
      <Route path="/Questions/:id" element={<DisplayQuestion />} />
      <Route path="/Tags" element={<Tags/>} />
      <Route path="/Users" element={<Users/>} />
      <Route path="/Subscription" element={<Payment/>} />
      <Route path="/Subscription/:successq/:session_idq/:typeq" element={<Payment/>} />
      <Route path="/Subscription/:canceled" element={<Payment/>} />
      <Route path="/Chatbot" element={<OpenaiChatbot/>} />
      <Route path="/Users/:id" element={<UserProfile />} />
      <Route path="/LeftSideBarMenu" element={<LeftSideBarMenu/>}/>


      //social media
      

    </Routes>
  )
}

export default AllRoutes