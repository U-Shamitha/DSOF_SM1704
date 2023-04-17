import {
    ManageAccountsOutlined,
    EditOutlined,
    WorkOutlineOutlined,
    LocationOnOutlined,
} from '@mui/icons-material';
import { Box, Typography, Divider, useTheme} from '@mui/material';
import UserImage from 'socialMedia/components/UserImage';
import FlexBetween from 'socialMedia/components/FlexBetween';
import WidgetWrapper from 'socialMedia/components/WidgetWrapper';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setPostedUser } from 'socialMedia/state';
import stateReducer from 'reducers/state_sm';
import twitter  from '../../../../src/assets/twitter.png';
import linkedin  from '../../../../src/assets/linkedin.png';

const server = 'https://socialmedia-server-k22t.onrender.com';

const UserWidget = ({ userId, picturePath, profileUrl }) => {
    const [ user, setUser ] = useState(null);
    const navigate = useNavigate();
    const token_sm = JSON.parse(localStorage.getItem('token_sm'));


    const getUser = async() => {
        const response = await fetch(`${server}/users/${userId}`,
        {
            method: "GET",
            headers: { Authorization: `Bearer ${token_sm}`}
        });
        const data = await response.json();
        console.log(data);
        setUser(data);
        // setPostedUser(data);
        console.log("in user: ")
        console.log(user);
        console.log("profile url: ")
        console.log(profileUrl);
    };

    useEffect(() => {
        getUser();
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if(!user){
        return null;
    }

    const {
        firstName,
        lastName,
        location,
        occupation,
        viewedProfile,
        impressions,
        friends
    }= user;

    return (
        <WidgetWrapper>
            {/* FIRST ROW */}
            <FlexBetween
                gap="0.5rem"
                pb="1.1rem"
                onClick={() => navigate(`/Community/sm/profile/${userId}`)}
            >
                <FlexBetween gap="1rem">
                    <UserImage image={profileUrl} />
                    <Box>
                        <Typography
                            variant='h4'
                            fontWeight= "500"
                            sx={{
                                "&:hover":{
                                    cursor: "pointer"
                                }
                            }}>
                                {firstName} {lastName}
                        </Typography>        
                        <Typography>{friends.length} friends </Typography>
                    </Box> 
                </FlexBetween>
                <ManageAccountsOutlined/>
            </FlexBetween>

            <Divider />

            {/* SECOND ROW */}
            <Box p="1rem 0"> 
                <Box display="flex" alignItems="center" gap="1rem" mb="0.5rem">
                    <LocationOnOutlined fontSize="large" />
                    <Typography >{location}</Typography>
                </Box>
                <Box display="flex" alignItems="center" gap="1rem" >
                    <WorkOutlineOutlined fontSize="large" />
                    <Typography >{location}</Typography>
                </Box>
            </Box>
            <Divider />

            {/* THIRD ROW */}
            <Box p="1rem 0">
                <FlexBetween mb="0.5rem">
                    <Typography >Who's viewed your profile</Typography>
                    <Typography fontWeight="500" >{viewedProfile}</Typography>
                </FlexBetween>
                <FlexBetween mb="0.5rem">
                    <Typography >Impressions of your post</Typography>
                    <Typography fontWeight="500" >{impressions}</Typography>
                </FlexBetween>
            </Box>
            <Divider />

            {/* FOURTH ROW */}
            <Box p="1rem 0">
                <Typography fontSize="1rem" fontWeight="500" mb="1rem">Social Profiles</Typography>

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src={twitter} alt="twitter" />
                        <Box>
                            <Typography fontWeight="500">Twitter</Typography>
                            <Typography>Social Network</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined />
                </FlexBetween>
                

                <FlexBetween gap="1rem" mb="0.5rem">
                    <FlexBetween gap="1rem">
                        <img src={linkedin} alt="linkedin" />
                        <Box>
                            <Typography fontWeight="500">Linkedin</Typography>
                            <Typography>Network Platform</Typography>
                        </Box>
                    </FlexBetween>
                    <EditOutlined />
                </FlexBetween>
                

            </Box>
        </WidgetWrapper>
    )
}

export default UserWidget;
