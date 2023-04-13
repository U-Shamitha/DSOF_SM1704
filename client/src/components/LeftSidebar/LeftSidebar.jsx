import React from 'react'
import './LeftSidebar.css';
import {Link, NavLink} from 'react-router-dom';
import Globe from '../../assets/Globe.svg'
import Navbar from '../Navbar/Navbar';

const socialMediaClient = 'https://socialmedia-client-snyv.onrender.com';

const LeftSidebar = () => {
  return (
    <div>
    <Navbar/>
    <div className='left-sidebar'>
        <nav className='side-nav'>
            <NavLink to='/' className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                <p>Home</p>
            </NavLink> 
            <div className='side-nav-div'>
                <div><p>PUBLIC</p></div>
                <NavLink to="/Questions" className='side-nav-links' activeclassname='active'>
                    <img src={Globe} alt="Globe" />
                    <p style={{paddingLeft:"10px"}}>Questions</p>
                </NavLink>
                <NavLink to="/Tags" className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Tags</p>
                </NavLink>
                <NavLink to="/Users" className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Users</p>
                </NavLink>
                {/* <a href={socialMediaClient} className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Community</p>
                </a> */}
                <NavLink to="/Community" className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Community</p>
                </NavLink>
                <NavLink to="/Subscription" className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Subscription</p>
                </NavLink>
                <NavLink to="/Chatbot" className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Chatbot</p>
                </NavLink>
            </div>
        </nav>
    </div>
    </div>
  )
}

export default LeftSidebar