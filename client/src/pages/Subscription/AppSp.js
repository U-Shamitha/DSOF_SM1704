import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { MyCheckOutForm } from "./MyCheckOutForm";
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar';
import './AppSp.css';



const stripePromise = loadStripe('pk_test_51MiCr7SIXsHnK2VWNfJ4HrTYIrnhyzDrx80atA6Dc7SUy1G8qxls7rWdLyCtYiRJ4JaYeYLo7ujFqTwcRJklAXnu000HBfWoJS');

function AppSp(){
  return (
    <div className='home-container-1'>
        <span className='leftSideBarHide' ><LeftSidebar /></span>
        <div className='home-container-2'>
            <h1>Subscription</h1>
            <Elements stripe={stripePromise}>
                <MyCheckOutForm/>
            </Elements>
        </div>  
     </div>
  )
}

export default AppSp;