import React from 'react';
import './Navbar.css'
import { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode'

import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg';
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import { setCurrentUser } from '../../actions/CurrentUser';


const Navbar = () => {
     
     const dispatch = useDispatch();
     const navigate = useNavigate();

     //get the logged in user info from local storage
     var User = useSelector((state) => (state.currentUserReducer))
     // console.log(User)

     //useEffect runs whenever the navbar is going to be visible
     useEffect(() => {
          const token = User?.token
          if(token){
               const decodeToken = decode(token);
               if(decodeToken.exp * 1000 < new Date().getTime()){
                    handleLogOut();
               }
          }
          dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
     },[dispatch])

     const handleLogOut = () => {
          dispatch({type : 'LOGOUT'});
          navigate('/');
          dispatch(setCurrentUser(null));
     }


    return (
        <nav className='main-nav'>
            <div className='navbar'>
               <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt='logo'/>
               </Link>
               <Link to='/' className='nav-item nav-btn'>
                    About
               </Link>
               <Link to='/' className='nav-item nav-btn'>
                    Products
               </Link>
               <Link to='/' className='nav-item nav-btn'>
                    For Teams
               </Link>
               <form>
                    <input type="text" placeholder='Search...'/>
                    <img src={search} alt="search" width="18" className='search-icon'/>
               </form>
               { User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log in</Link>:
                    <> 
                         <Avatar backgroundColor='#009dff' px="5px" py="5px" borderRadius="50%" color="white"><Link to={`/Users/${User.result?._id}`} style={{color:'white',textDecoration:'none'}} className=''>{User.result.name.charAt(0).toUpperCase()}</Link></Avatar>
                         <button className='nav-item nav-links' onClick={handleLogOut}>Log out</button>
                    </>
               }
               

            </div>
        </nav>
    );
}

export default Navbar;
