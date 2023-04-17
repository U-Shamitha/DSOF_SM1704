import React from 'react'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import UserPostPage from 'socialMedia/scenes/userPostPage'

const UserPost = () => {

  return (
    <div className='home-container-1'>
        <span className='leftSideBarHide' ><LeftSidebar /></span>
        <div className="home-container-2" style={{marginTop:"30px"}}>
            <UserPostPage/>
        </div>
    </div>
  )
}

export default UserPost;