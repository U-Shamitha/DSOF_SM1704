import { Box, useMediaQuery } from '@mui/material';
import Friend from 'components/Friend';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


import Navbar from 'scenes/navbar';
import FriendListWidget from 'scenes/widgets/FriendListWidget';
import MyPostWidget from 'scenes/widgets/MyPostWidget';
import PostsWidget from 'scenes/widgets/PostsWidget';
import UserWidget from 'scenes/widgets/UserWidget';
import PostWidget from 'scenes/widgets/PostWidget';
import { setUserPost, setPostedUser } from 'state';


const UserPostPage = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
const location = useLocation();

dispatch(setPostedUser({postedUSer: null}))
// dispatch(setUserPost({userPost : []}))
// const user= useSelector((state) => state.postedUser);
// const post = useSelector((state) => state.userPost);
// const [reloadCount, setReloadCount] = useState(0);
const [post, setPost] = useState(null);
// console.log(post);
const{ postId } = useParams();
const token = useSelector((state) => state.token );
const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

// const getUser = async () => {
//   const response = await fetch(
//     `http://localhost:3001/users/${post.userId}`,{
//     method: "GET",
//     headers: { Authorization: `Bearer ${token}`}
//   });
//   const data = await response.json();
//   console.log(data);
//   dispatch(setPostedUser({postedUser: data}));
//   // setUser(data);
// }

const server = 'https://socialmedia-server-k22t.onrender.com';


const getUserPost = async () => {
  const response = await fetch(
    `${server}/userPost/${postId}`,{
    method: "GET",
    headers: { Authorization: `Bearer ${token}`}
  });
  const data = await response.json();
  console.log(data[0]);
  // setUser(data.userId)
  dispatch(setUserPost({userPost: data[0]}));
  setPost(data[0]);
  console.log(post)

  // const response2 = await fetch(
  //   `http://localhost:3001/users/${post.userId}`,{
  //   method: "GET",
  //   headers: { Authorization: `Bearer ${token}`}
  // });
  // const data2 = await response2.json();
  // console.log(data2);
  // dispatch(setPostedUser({postedUser: data2}));
}

useEffect(() => {
  getUserPost();
  console.log("post: "+post);
  // getUser();
  // console.log("user: "+user)
},[]); // eslint-disable-line react-hooks/exhaustive-deps

// useEffect(() => {
//   console.log()
//   // navigate(0);
// },[])
if(!post) {return null};


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
          <UserWidget userId={post.userId} picturePath={post.userPicturePath} />
          <Box m='2rem 0' />
          <FriendListWidget userId={post.userId} isUser={false}/>
        </Box>

        <Box flexBasis={isNonMobileScreens ? "42%" : undefined }
          mt={isNonMobileScreens ? undefined : "0rem" }
        >
          {/* <MyPostWidget picturePath={user.picturePath} /> */}
          {/* <PostsWidget userId={ userId } isProfile  isUser={false}/> */}
          
          <PostWidget 
              key={post._id}
              postId = {post._id}
              postUserId = {post.userId}
              // name = {`${user.firstName} ${user.lastName}`}
              description = {post.description}
              location = {post.location}
              picturePath = {post.picturePath}
              videoUrl={post.videoUrl}
              userPicturePath = {post.userPicturePath}
              likes = {post.likes}
              comments = {post.comments}
              isUser = {false}
              isUserPost = {true}
          />
          <Box m='2rem 0' />
        </Box>
      </Box>
      {/* {dispatch(setPostedUser({postedUSer: null}))}
      {dispatch(setUserPost({userPost : []}))} */}
    </Box>
   
  )
}

export default UserPostPage;