import React from 'react'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { themeSettings } from './socialMedia/theme';
import { useMemo } from 'react';

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
import Community from './pages/Community/Community';

import LoginPage from 'socialMedia/scenes/loginPage';
import HomePage from 'socialMedia/scenes/homePage';
import ProfilePage from 'socialMedia/scenes/profilePage';
import UserPostPage from 'socialMedia/scenes/userPostPage';
import CommunityHome from 'pages/Community/Home';
import Profile from 'pages/Community/Profile';
import UserPost from 'pages/Community/UserPost';

const AllRoutes = () => {


  const theme = useMemo(() => createTheme(themeSettings('light')),['light']);

  let isAuth = JSON.parse(localStorage.getItem('token_sm'));//sm
  console.log('isAuth');
  console.log(isAuth);
  // isAuth = isAuth ? isAuth.token_sm : undefined;
 

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> 
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/Auth" element={<Auth/>} />
        <Route path="/Questions" element={<Questions/>} />
        <Route path="/AskQuestion" element={<AskQuestion />} />
        <Route path="/Questions/:id" element={<DisplayQuestion />} />
        <Route path="/Tags" element={<Tags/>} />
        <Route path="/Users" element={<Users/>} />
        <Route path="/Subscription" element={<Payment/>} />
        <Route path="/Subscription/:success/:session_id/:type" element={<Payment/>} />
        <Route path="/Subscription/:canceled" element={<Payment/>} />
        <Route path="/Chatbot" element={<OpenaiChatbot/>} />
        <Route path="/Users/:id" element={<UserProfile />} />
        <Route path="/LeftSideBarMenu" element={<LeftSideBarMenu/>}/>
        <Route path="/Community" element={<Community/>}/>

        //sm
        <Route path="/Community/sm" element={<Community />} />
        <Route path="/Community/sm/home" element={Boolean(isAuth) ? <CommunityHome/> : <Navigate to="/Community" />} />
        <Route path="/Community/sm/profile/:userId" element={<Profile />} />
        <Route path="/Community/sm/userPost/:postId" element={<UserPost />} />
        
      </Routes>
    </ThemeProvider>
  )
}

export default AllRoutes