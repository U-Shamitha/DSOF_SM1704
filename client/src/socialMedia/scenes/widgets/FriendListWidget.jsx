import { Box, Typography, useTheme } from '@mui/material';
import Friend from 'socialMedia/components/Friend'; 
import WidgetWrapper from 'socialMedia/components/WidgetWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from 'socialMedia/state';
import { useNavigate } from 'react-router-dom';
import stateReducer from 'reducers/state_sm';

const server = 'https://socialmedia-server-k22t.onrender.com';


const FriendListWidget = ({ userId, isUser, refreshHome }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const token = JSON.parse(localStorage.getItem('token_sm'));
    const [friends, setFriends] = useState(JSON.parse(localStorage.getItem('user_sm'))?.friends);
    // const [friends,setFriends] = useState(useSelector((state)=>stateReducer)?.data?.user_sm?.friends);
    console.log(friends);

    const refreshFriendList = (data) => {
        setFriends(data);
        navigate(0);
        refreshHome(true);
    }

    const getFriends = async() => {
        const response = await fetch(
            `${server}/users/${userId}/friends`,
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}`}
            }
        );
        const data = await response.json();
        console.log(data);
        dispatch({type:'SETFRIENDS_SM', payload: {friends_sm : data}});
        setFriends(data);
    };


    useEffect(() => {
        getFriends();
    }, []); //eslint-disable-line react-hooks/exhaustive-deps

    return(
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight="500"
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {friends?.map((friend) => (
                    <Friend 
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                        userProfileUrl={friend.profileUrl}
                        isUser={isUser}
                        refreshFriendList={refreshFriendList}
                    />
                ))

                }

            </Box>
        </WidgetWrapper>
    )


}

export default FriendListWidget;