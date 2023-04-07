import { useState, useEffect } from 'react'
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery
} from '@mui/material'
import {
  Search,
  Message,
  DarkMode,
  LightMode,
  Notifications,
  Help,
  Menu,
  Close
} from '@mui/icons-material';
import  SelectSearch  from 'react-select-search';
import { useDispatch, useSelector } from 'react-redux';
import { setMode, setLogout } from '../../state';
import { useNavigate } from 'react-router-dom';


import FlexBetween from 'components/FlexBetween';


const server = 'https://socialmedia-server-k22t.onrender.com';

const Navbar = () => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const isNonMoblieScreens = useMediaQuery("(min-width: 1000px)");

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const background = theme.palette.background.default;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  const fullName = `${user?.firstName} ${user?.lastName}`;
  // const fullName =  "SHAMITHA";

  const [searchUSer, setSearchUser] = useState(undefined);
  const [userSearchList, setUserSearchList] = useState([user]);
  const [showMatchedUsers, setShowMatchedUsers] =useState(false);


  const handleSearch = async(e) => {
    if (e.key !== "Enter") {
      return;
    }

    const response = await fetch(
      `${server}/users/name/${searchUSer}`,{
      method: "GET",
      headers: { Authorization: `Bearer ${token}`}
    });
    const users = await response.json();
    console.log(users);
    setUserSearchList(users);
    if(users) {setShowMatchedUsers(true)};
    // const userId = users[0]._id;
    // console.log(userId);
    // navigate(`/profile/${userId}`)  
  }


  return <FlexBetween padding='1rem 6%' backgroundColor={alt}>
    <FlexBetween gap='1.75rem'>
      <Typography
        fontWeight = "bold"
        fontSize = "clamp(1rem,2rem, 2.25rem)" //min preferred max
        color = 'primary'
        onClick = {() => navigate("/home")}
        sx={{
          "&:hover":{
            color: primaryLight,
            cursor: "pointer",
          },
        }}
      >
        SocioPedia
      </Typography>


      {isNonMoblieScreens && (
        <FlexBetween backgroundColor={neutralLight} borderRadius='9px' gap='3rem' padding='0.1rem 1.5rem'>
        <IconButton>
          <Search onClick={(e)=>setShowMatchedUsers(false)}/>
        </IconButton>
      {  !showMatchedUsers && <InputBase placeholder='Search...' onChange={(e)=>{setSearchUser(e.target.value);console.log(searchUSer)}} onKeyDown={(e)=>handleSearch(e)}></InputBase> } 
      { showMatchedUsers && 
        <FormControl variant="standard" value={fullName} sx={{width:'80%'}}>
        <Select value={user.firstName} >
          {userSearchList.map((userp)=> (
            <MenuItem key={userp._id} value={userp._id} onClick={(e) => {navigate(`/profile/${userp._id}`);navigate(0)}} >
              <Typography>{userp.firstName+" "+userp.lastName }</Typography>
            </MenuItem>
          ))}
        </Select>
        </FormControl>
      }

        </FlexBetween>
      )}
    </FlexBetween> 

    { /* DESKTOP NAV */}
    {isNonMoblieScreens ? (
      <FlexBetween gap='2rem'> 
        <IconButton onClick={() => dispatch(setMode())}>
          {theme.palette.mode === "dark" ? (
            <DarkMode sx={{ fontSize: "25px"}} />
          ):(
            <LightMode sx={{ color: dark, fontSize: "25px"}} />
          )}
        </IconButton>
        <Message sx={{ fontSize: "25px" }} />
        <Notifications sx={{ fontSize: "25px" }} />
        <Help sx={{ fontSize: "25px" }} />
        <FormControl variant="standard" value={fullName}>
          <Select
            value={fullName}
            sx={{
              backgroundColor: neutralLight,
              width: "150px",
              borderRadius: "0.25rem",
              p: "0.25rem 1rem",
              "& .MuiSvgIcon-root":{
                pr: "0.25rem",
                width: "3rem"
              },
              "& .MuiSelect-select:focus":{
                backgroundColor: neutralLight
              }
            }}
            input={<InputBase/>}
            >
              <MenuItem value={fullName}>
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem onClick={()=> dispatch(setLogout())}>Log Out</MenuItem>

          </Select>

        </FormControl>
      </FlexBetween>
      ) : (
      <IconButton
        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
      >
        <Menu />
      </IconButton>
    )}

    {/* MOBILE NAV */}
    {!isNonMoblieScreens && isMobileMenuToggled && (
      <Box
        position = "fixed"
        right = "0"
        bottom= "0"
        height = "100%"
        zIndex ="10"
        maxWidth="500px"
        minWidth="300px"
        backgroundColor = {background}
        >

          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close/>
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap='3rem'> 
            <IconButton onClick={() => dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px"}} />
              ):(
                <LightMode sx={{ color: dark, fontSize: "25px"}} />
              )}
            </IconButton>
            <Message sx={{ fontSize: "25px" }} />
            <Notifications sx={{ fontSize: "25px" }} />
            <Help sx={{ fontSize: "25px" }} />
            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root":{
                    pr: "0.25rem",
                    width: "3rem"
                  },
                  "& .MuiSelect-select:focus":{
                    backgroundColor: neutralLight
                  }
                }}
                input={<InputBase/>}
                >
                  <MenuItem value={fullName}>
                    <Typography>{fullName}</Typography>
                  </MenuItem>
                  <MenuItem onClick={()=> dispatch(setLogout())}>Log Out</MenuItem>

              </Select>

            </FormControl>
          </FlexBetween>

      </Box>
    )}
      


  </FlexBetween>


  

  


  
}

export default Navbar;