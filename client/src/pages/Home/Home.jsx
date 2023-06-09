import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import RightSidebar from '../../components/RightSidebar/RightSidebar';
import HomeMainbar from '../../components/HomeMainbar/HomeMainbar';
import '../../App.css'

const Home = () => {
  return (
    <div>
      <div className='home-container-1'>
        <div className='leftSideBarHide'><LeftSidebar/></div>
        <div className='home-container-2'>
          <HomeMainbar/>
          <div className='rightSideBarHide'><RightSidebar/></div>
        </div>

      </div>
    </div>
  )
}

export default Home