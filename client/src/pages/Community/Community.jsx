import React from 'react'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import LoginPage from 'socialMedia/scenes/loginPage'

const Community = () => {

  return (
    <div className='home-container-1'>
        <span className='leftSideBarHide' ><LeftSidebar /></span>
        <div className="home-container-2" style={{marginTop:"30px"}}>
            <LoginPage/>
        </div>
    </div>
  )
}

export default Community;