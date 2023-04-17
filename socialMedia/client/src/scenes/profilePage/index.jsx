import { Box, useMediaQuery } from '@mui/material';
import Friend from 'components/Friend';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Navbar from 'scenes/navbar';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import UserWidget from 'scenes/widgets/UserWidget';

const server = 'https://socialmedia-server-k22t.onrender.com';

const ProfilePage = () => {
const [user, setUser] = useState(null);
const{ userId } = useParams();
const token = JSON.parse(localStorage.getItem('token_sm'));
const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

const getUser = async () => {
  const response = await fetch(
    `${server}/users/${userId}`,{
    method: "GET",
    headers: { Authorization: `Bearer ${token}`}
  });
  const data = await response.json();
  console.log(data);
  setUser(data);
}

useEffect(() => {
  getUser();
},[]); // eslint-disable-line react-hooks/exhaustive-deps

if(!user) return null;

  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined }>
          <UserWidget userId={userId} profileUrl={user.profileUrl} />
          <Box m='2rem 0' />
          <FriendListWidget userId={userId} isUser={false}/>
        </Box>

        <Box flexBasis={isNonMobileScreens ? "42%" : undefined }
          mt={isNonMobileScreens ? undefined : "0rem" }
        >
          {/* <MyPostWidget picturePath={user.picturePath} /> */}
          <PostsWidget userId={ userId } isProfile  isUser={false}/>
          <Box m='2rem 0' />
        </Box>

      </Box>
    </Box>
  )
}

export default ProfilePage;