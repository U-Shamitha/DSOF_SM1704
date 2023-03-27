import React from 'react';
import { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import decode from 'jwt-decode'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'

import logo from '../../assets/logo.png';
import search from '../../assets/search-solid.svg';
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import { setCurrentUser } from '../../actions/CurrentUser';
import './Navbar.css'
import '../../App.css'
import LeftSidebarMenu from '../LeftSidebar/LeftSidebar';


const Navbar = () => {
     
     const dispatch = useDispatch();
     const navigate = useNavigate();

     //get the logged in user info from local storage
     var User = useSelector((state) => (state.currentUserReducer))
     console.log(User?.result?.subscriptionDetails);

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
               <span className='nav-item nav-bars'>
                    <Link to="/LeftSideBarMenu" style={{textDecoration:'none', color:'black'}}><FontAwesomeIcon icon={faBars} style={{width:'20px'}}/></Link>
               </span>
               <Link to='/' className='nav-item nav-logo nav-hide'>
                    <img src={logo} alt='logo'/>
               </Link>
               <Link to='/' className='nav-item nav-btn nav-hide'>
                    About
               </Link>
               <Link to='/' className='nav-item nav-btn nav-hide'>
                    Products
               </Link>
               <Link to='/' className='nav-item nav-btn nav-hide'>
                    For Teams
               </Link>
               <form>
                    <input type="text" placeholder='Search...'/>
                    <img src={search} alt="search" width="18" className='search-icon'/>
               </form>
               { User === null ?
                    <Link to='/Auth' className='nav-item nav-links'>Log in</Link>:
                    <> 
                         <span className='avatar'><Avatar backgroundColor='#009dff' px="5px" py="5px" borderRadius="50%" color="white" ><Link to={`/Users/${User?.result?._id}`} style={{color:'white',textDecoration:'none', width:'15px'}} >{User?.result?.name?.charAt(0).toUpperCase()}</Link></Avatar></span>
                         <button className='nav-item nav-links' width="20px" onClick={handleLogOut}>Log out</button>
                    </>
               }
               

            </div>
        </nav>
    );
}

export default Navbar;
