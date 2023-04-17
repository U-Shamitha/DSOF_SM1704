import React from 'react'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import LoginPage from 'socialMedia/scenes/loginPage'
import HomePage from 'socialMedia/scenes/homePage'

const CommunityHome = () => {

  return (
    <div className='home-container-1'>
        <span className='leftSideBarHide' ><LeftSidebar /></span>
        <div className="home-container-2" style={{marginTop:"30px"}}>
            <HomePage/>
        </div>
    </div>
  )
}

export default CommunityHome;