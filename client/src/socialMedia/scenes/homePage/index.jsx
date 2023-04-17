import { Box, useMediaQuery } from '@mui/material'
import { useSelector } from 'react-redux';

import Navbar from 'socialMedia/scenes/navbar/index';
import UserWidget from 'socialMedia/scenes/widgets/UserWidget';
import MyPostWidget from 'socialMedia/scenes/widgets/MyPostWidget';
import PostsWidget from 'socialMedia/scenes/widgets/PostsWidget';
import AdvertWidget from 'socialMedia/scenes/widgets/AdvertWidget'
import FriendListWidget from 'socialMedia/scenes/widgets/FriendListWidget';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useState } from 'react';

const HomePage = () => {
const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
const user_sm = JSON.parse(localStorage.getItem('user_sm'));
console.log('user_sm');
console.log(user_sm);
const _id = user_sm?._id;
const profileUrl = user_sm?.profileUrl
console.log(_id)
console.log(profileUrl)


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBsI8KZSX5d3O55-98HKlPBUh0BDSJ_meI",
  authDomain: "sma1-1a501.firebaseapp.com",
  projectId: "sma1-1a501",
  storageBucket: "sma1-1a501.appspot.com",
  messagingSenderId: "334054976510",
  appId: "1:334054976510:web:040c64a73bebfd9e876eaf"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const [refresh, setRefresh] =  useState(false);
const refreshHome = (ref) => {
    setRefresh(ref);
}

  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined }>
          <UserWidget userId={_id} profileUrl={profileUrl} />
        </Box>
        <Box flexBasis={isNonMobileScreens ? "42%" : undefined }
          mt={isNonMobileScreens ? undefined : "2rem" }
        >
          <MyPostWidget picturePath={profileUrl} />
          <PostsWidget userId={ _id } isUser={true}/>

        </Box>
        {isNonMobileScreens && (<Box flexBasis="26%">
          <AdvertWidget />
          <Box m="2rem 0" />
          <FriendListWidget userId={_id} isUser={true} refreshHome={refreshHome}/>
        </Box>)}

      </Box>
    </Box>
  )
}

export default HomePage;