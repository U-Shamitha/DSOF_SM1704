import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBirthdayCake, faPen } from '@fortawesome/free-solid-svg-icons'
import moment from 'moment'


import LeftSideBar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import EditProfileForm from './EditProfileForm'
import ProfileBio from './ProfileBio'
import './UserProfile.css'


const UserProfile = () => {

const { id } = useParams();
const users = useSelector((state)=> state.usersReducer)
const currentProfile = users.filter((user)=> user._id === id)[0] // profile of user on which you made a click
// console.log(currentProfile)
const currentUser = useSelector((state)=>(state.currentUserReducer))// profile of logged in user

const [Switch, setSwitch] = useState(false);

  return (
    <div className='home-container-1'>
      <LeftSideBar/>  
      <div className="home-container-2">
        <section>
            <div className="user-details-container">
                <div className='user-details'>
                    <Avatar  backgroundColor="purple"  borderRadius="2px"  color='white' fontSize='50px' px='40px' py='40px' > 
                        {currentProfile?.name.charAt(0).toUpperCase()}
                     </Avatar>
                     <div className='user-name' >
                       <h1>{currentProfile.name}</h1>
                       <p> <FontAwesomeIcon icon ={faBirthdayCake} /> Joined {moment(currentProfile?.joinedOn).fromNow()}</p>
                     </div>
                </div>  
                {
                  currentUser?.result._id === id && (
                  <button type='button' onClick={()=> setSwitch(true)} className='edit-profile-btn'>
                    <FontAwesomeIcon icon={faPen} /> Edit Profile
                  </button>
                  )
                }
            </div>
            <>
                  {
                    Switch? (
                      <EditProfileForm currentUser={currentUser} setSwitch={setSwitch}/> 
                    ):(
                      <ProfileBio currentProfile={currentProfile} />
                    )
                  }
            </>
    </section>
      </div>
    </div>
  )
}

export default UserProfile