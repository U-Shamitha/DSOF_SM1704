import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar';
import '../../App.css'

const Questions = () => {
  return (
    <div>
      <div className='home-container-1'>
      <span className='leftSideBarHide' ><LeftSidebar /></span>
        <div className='home-container-2'>
          <HomeMainbar/>
          <RightSidebar/>
        </div>

      </div>
    </div>
  )
}

export default Questions