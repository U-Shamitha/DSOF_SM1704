import { 
    ChatBubbleOutlineOutlined, 
    FavoriteBorderOutlined, 
    ShareOutlined, 
    FavoriteOutlined
} from "@mui/icons-material";
import {
    Box,
    Divider,
    IconButton,
    Typography,
    useTheme
} from '@mui/material';
import copy from 'copy-to-clipboard';
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


import { setPost } from 'state';
import FlexBetween from "components/FlexBetween";
import Friend from 'components/Friend';
import WidgetWrapper from "components/WidgetWrapper";

const server = 'https://socialmedia-server-k22t.onrender.com';

const PostWidget =({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    imageUrl,
    videoUrl,
    userPicturePath, 
    userProfileUrl,
    likes, 
    comments,
    isUser,
    isUserPost
}) => {
    const [isComments, setIsComments ] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    console.log("loggedInUserId: "+loggedInUserId)
    console.log("likes: "+likes)
    const isLiked =  Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;

    const navigate = useNavigate();

    // const deployingClientUrl = `http://localhost:3000`
    const deployingClientUrl = `https://socialmedia-client-snyv.onrender.com`
 
    const handleShare = () => {
        copy(deployingClientUrl+"/userPost/"+ postId);
        alert('Copied url: '+ deployingClientUrl+"/userPost/"+ postId);
    }

    const patchLike = async () => {
        const response = await fetch(`${server}/posts/${postId}/like`,{
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: loggedInUserId })
        });
        const updatedPost = await response.json();
        dispatch(setPost({ post: updatedPost }));
        if(isUserPost){
            navigate(0);
        }
    };

    return (
        <WidgetWrapper m="2rem 0">
            <Friend
                friendId={postUserId}
                name={name}
                subtitle={location}
                userPicturePath={userPicturePath}
                userProfileUrl = {userProfileUrl} 
                isUser = {isUser}
                isUserPost ={isUserPost}
            />
            <Typography  color={main} sx={{ mt: "1rem"}}>
                {description}
            </Typography>
            {imageUrl && (
                <img
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{borderRadius: "0.75rem", marginTop: "0.75rem"}}
                    src = {imageUrl}
                />
            )}
             {videoUrl && (
                <video
                    width="100%"
                    height="auto"
                    alt="post"
                    style={{borderRadius: "0.75rem", marginTop: "0.75rem"}}
                    src = {videoUrl}
                    autoPlay
                    loop
                    playsInline
                    muted
                    controls

                />
            )}
            <FlexBetween mt="0.25rem">
                <FlexBetween gap="1rem">

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={patchLike}>
                            {isLiked ? (
                                <FavoriteOutlined sx={{ color: primary}} />
                            ) : (
                                <FavoriteBorderOutlined/>
                            )}
                        </IconButton>
                        <Typography>{likeCount}</Typography>
                    </FlexBetween>

                    <FlexBetween gap="0.3rem">
                        <IconButton onClick={() => setIsComments(!isComments)}>
                            <ChatBubbleOutlineOutlined />
                        </IconButton>
                        <Typography>{comments.length}</Typography>
                    </FlexBetween>

                </FlexBetween>

                <IconButton onClick={handleShare}>
                    <ShareOutlined />
                </IconButton>
             </FlexBetween>
                {isComments && (
                    <Box mt="0.5rem">
                        {comments.map((comment, i) => (
                            <Box key={`${name} - ${i}`}>
                                <Divider />
                                <Typography sx={{ color: main, m: "0.5rem 0", pl: "1rem"}}>
                                    {comment}
                                </Typography>
                            </Box>
                        ))}
                        <Divider />
                    </Box>
                )}
           
        </WidgetWrapper>
    )
}

export default PostWidget;
