import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "socialMedia/state";
import PostWidget from './PostWidget';
import stateReducer from "reducers/state_sm";
import {useNavigate } from "react-router-dom";

const server = 'https://socialmedia-server-k22t.onrender.com';

const PostsWidget = ({ userId, isProfile = false, isUser}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const posts = useSelector((state) => state.posts);
    const [posts_sm, setPosts] = useState(useSelector((state) => stateReducer)?.posts_sm);
    console.log(posts_sm)
    const user_sm = JSON.parse((localStorage.getItem('user_sm')));
    const token_sm = JSON.parse((localStorage.getItem('token_sm')));
    
   
    const refreshFriendList = () => {
        getPosts();
        // refreshHome(true);
    }

    const  getPosts = async() => {
        const response = await fetch(`${server}/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token_sm}`},
        });
        const data = await response.json();
        console.log(data);
        dispatch({type:'SETPOSTS_SM', payload: {posts_sm: data}}); 
        setPosts(data);
        
    }

    const  getUserPosts = async() => {
        const response = await fetch(`${server}/posts/${userId}/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token_sm}`}
        });
        const data = await response.json();
        console.log(data);
        dispatch({type:'SETPOSTS_SM', payload: {posts_sm:data}});
        setPosts(data); 
    }

    useEffect(() => {
        if (isProfile){
            getUserPosts();
        }else{
            getPosts();
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return(
        <>
            {posts_sm?.map(
                ({
                    _id,
                    userId,
                    firstName,
                    lastName,
                    description,
                    location,
                    picturePath,
                    imageUrl,
                    videoUrl,
                    userProfileUrl,
                    userPicturePath,
                    likes,
                    comments
                }) => (
                    <PostWidget 
                        key={_id}
                        postId = {_id}
                        postUserId = {userId}
                        name = {`${firstName} ${lastName}`}
                        description = {description}
                        location = {location}
                        picturePath = {picturePath}
                        imageUrl={imageUrl}
                        videoUrl={videoUrl}
                        userProfileUrl={userProfileUrl}
                        userPicturePath = {userPicturePath}
                        likes = {likes}
                        comments = {comments}
                        isUser = {isUser}
                        isUserPost = {false}
                        refreshFriendList={refreshFriendList}
                        setPosts={setPosts}
                    />
                )
            )}
        </>
    );

};

export default PostsWidget;