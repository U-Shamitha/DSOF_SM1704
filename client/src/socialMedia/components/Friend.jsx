import { 
    PersonAddOutlined,
    PersonRemoveOutlined
} from "@mui/icons-material";
import { 
    Box,
    IconButton,
    Typography,
    useTheme
} from '@mui/material';
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "socialMedia/state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import stateReducer from "reducers/state_sm";

const server = 'https://socialmedia-server-k22t.onrender.com';

const Friend = ({ friendId, name, subtitle, userPicturePath,userProfileUrl, isUser, isUserPost, refreshFriendList, setPosts}) => {

    console.log("isUser: "+isUser)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    console.log(JSON.parse(localStorage.getItem('user_sm')));
    const { _id } = JSON.parse(localStorage.getItem('user_sm'));
    const token = JSON.parse(localStorage.getItem('token_sm'));
    const [friends, setFriends] = useState(JSON.parse(localStorage.getItem('user_sm'))?.friends);
    // const [friends, setFriends] = useState((useSelector((state) => stateReducer))?.user_sm?.friends);
    console.log(friends);
    const [ user, setUser ] = useState(null);

    const { palette } = useTheme();
    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend =friends?.find((friend) => friend._id === friendId); //data from redux, friends contain all details of each friend
    console.log(isFriend)
    // const isFriend = false;

    const patchFriend = async () => {
        if(_id !== friendId){
        const response = await fetch(
            `${server}/users/${_id}/${friendId}`,
            {
                method: "PATCH",
                headers:{
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            });
        // ).then((res) =>
        //     console.log(res)
        // ).catch((err) => console.log(err.message));
        const data = await response.json();
        console.log(data)
        dispatch({type:'SETFRIENDS_SM', payload: { friends_sm: data}});
        console.log(JSON.parse(localStorage.getItem('user_sm')))
        setFriends(data);
        refreshFriendList(data);
        console.log("before get posts");
        getPosts(); 
        }
    };

    const  getPosts = async() => {
        console.log("in get posts")
        const response = await fetch(`${server}/posts`,{
            method: "GET",
            headers: { Authorization: `Bearer ${token}`},
        });
        const data = await response.json();
        console.log(data);
        dispatch({type:'SETPOSTS_SM', payload: {posts_sm: data}});
        setPosts(data);        
        navigate(0);
        
    }

    const getUser = async() => {
        const response = await fetch(`${server}/users/${friendId}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token}`}
        });
        const data = await response.json();
        setUser(data);
        console.log(user)
        // console.log("in user: "+data)
    };

    const getFriends = async() => {
        const response = await fetch(
            `${server}/users/${_id}/friends`,
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


    useEffect(()=> {
        getUser();
        getFriends();
    },[])

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage image={userProfileUrl} size="55px" />
                <Box
                    onClick={() => {
                        navigate(`/Community/sm/profile/${friendId}`);
                        navigate(0); //to refresh the components
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="500"
                        sx={{
                            "&:hover":{
                                color: palette.primary.light,
                                cursor: "pointer"
                            }
                        }}
                    >
                    {/* {console.log("isUserPost: "+isUserPost)}
                    {console.log("user: "+user.firstName)} */}
                    {isUserPost && user && <span>{user.firstName+" "+user.lastName}</span> }
                    {!isUserPost &&  <span>{name}</span>}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            {(_id!==friendId && isUser && !isUserPost ) &&
                <IconButton
                    onClick={() => patchFriend()}
                    sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
                >
                    {isFriend ? (
                        <PersonRemoveOutlined sx={{ color: primaryDark }} />
                    ) : (

                        <PersonAddOutlined sx={{ color: primaryDark }} />
                    )
                    }
                </IconButton>
            }

        </FlexBetween>
        

         )

}

export default Friend;