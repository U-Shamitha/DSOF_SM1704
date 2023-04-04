import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from './PostWidget';

const server = 'https://socialmedia-server-k22t.onrender.com';

const PostsWidget = ({ userId, isProfile = false, isUser}) => {
    const dispatch = useDispatch();
    const posts = useSelector((state) => state.posts);
    console.log(posts)
    const token = useSelector((state) => state.token);

    const  getPosts = async() => {
        const response = await fetch(`${server}/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        console.log("data: "+ data);
        dispatch(setPosts({ posts: data })); 
        
    }

    const  getUserPosts = async() => {
        const response = await fetch(`${server}/posts/${userId}/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        dispatch(setPosts({ posts: data })); 
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
            {posts.map(
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
                        isUser = {true}
                        isUserPost = {false}
                    />
                )
            )}
        </>
    );

};

export default PostsWidget;