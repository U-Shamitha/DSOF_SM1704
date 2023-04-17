import React from 'react'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import ProfilePage from 'socialMedia/scenes/profilePage'

const Profile = () => {

  return (
    <div className='home-container-1'>
        <span className='leftSideBarHide' ><LeftSidebar /></span>
        <div className="home-container-2" style={{marginTop:"30px"}}>
            <ProfilePage/>
        </div>
    </div>
  )
}

export default Profile;