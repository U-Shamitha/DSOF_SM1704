import React from 'react'

import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import socialMediaLogin from 'sm-client/src/scenes/homePage/index'

const Community = () => {

  return (
    <div className='home-container-1'>
        <span className='leftSideBarHide' ><LeftSidebar /></span>
        <div className="home-container-2" style={{marginTop:"30px"}}>
            <h1 style={{fontWeight:"400"}}>Users</h1>
            <socialMediaLogin/>
        </div>
    </div>
  )
}

export default Community;