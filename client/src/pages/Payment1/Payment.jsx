import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import Payment1 from './Payment1';
import ShowSubscription from './ShowSubscriptions';
// import VukaApp from './VukaApp';
// import './VukaApp.css';


const Payment = () => {
  return (
    <div className='home-container-1'>
        <span className='leftSideBarHide' ><LeftSidebar /></span>
        <div className='home-container-2'>
            <h1 className="h1Sp">Subscription</h1>
            <ShowSubscription/>
        </div>  
     </div>
  )
}

export default Payment;