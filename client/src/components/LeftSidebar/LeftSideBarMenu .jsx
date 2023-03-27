import React from 'react'
import './LeftSideBarMenu.css';
import {NavLink} from 'react-router-dom';
import Globe from '../../assets/Globe.svg'

const LeftSideBarMenu = () => {
  return (
    <div className='left-sidebarm'>
        <nav className='side-navm'>
            <NavLink to='/' className='side-nav-linksm' activeclassname='active' style={{paddingLeft:"40px"}}>
                <p>Home</p>
                
            </NavLink> 
            <hr style={{width:'100%'}}/>
            <div className='side-nav-divm'>
                <div><p>PUBLIC</p></div>
                <NavLink to="/Questions" className='side-nav-linksm' activeclassname='active'>
                    <img src={Globe} alt="Globe" />
                    <p style={{paddingLeft:"10px"}}>Questions</p>
                </NavLink>
                <NavLink to="/Tags" className='side-nav-linksm' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Tags</p>
                </NavLink>
                <NavLink to="/Users" className='side-nav-linksm' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Users</p>
                </NavLink>
                <a href="http://localhost:3000/" className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Community</p>
                </a>
                <NavLink to="/Subscription" className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Subscription</p>
                </NavLink>
                <NavLink to="/Chatbot" className='side-nav-links' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Chatbot</p>
                </NavLink>
                
            </div>
            <div className='lsb-hide-linksm'>
                <NavLink to="/" className='side-nav-linksm' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>About</p>
                </NavLink>
                <NavLink to="/" className='side-nav-linksm' activeclassname='active' style={{paddingLeft:"40px"}}>
                    <p>Products</p>
                </NavLink>
                    
            </div>
        </nav>
    </div>
  )
}

export default LeftSideBarMenu