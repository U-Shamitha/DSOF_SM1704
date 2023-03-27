import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment'

import { setNewSubscription } from '../../actions/users';
import { setCurrentUser } from '../../actions/CurrentUser';

// import './App.css';

const server = 'http://localhost:5000'

const ProductDisplay = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.currentUserReducer)

  // function handleClick (type)  {
  //   try{
  //     console.log("type: "+type)
  //     dispatch({type: 'SET_TYPE', payload: type })
  //     console.log("after set type")
  //     console.log("type: "+type)
  //     // navigate(`${server}/create-checkout-session`)
  //   }catch(error){
  //     console.log(error)
  //   }
  // }

  // function  handleClick (type){
  //   console.log("type: "+type)
  //   dispatch({type: 'SET_TYPE', payload: type })
  // }
 return(
    <div style={{display:'flex', justifyContent:'space-around'}}>
        <section>
            <div className="product0">
            {/* <Logo /> */}
            <div className="description">
                <h3>1 question a day</h3>
                <h5>₹0 / month</h5>
            </div>
            </div>
            <form action={server+"/create-checkout-session"} method="POST" >
            {/* Add a hidden field with the lookup_key of your Price */}
            <input type="hidden" name="lookup_key" value="0pm" />
            <input type="hidden" name="type" value="1" />
            <input type="hidden" name="email" value={user?.result?.email} />
            <button id="checkout-and-portal-button1" type="submit">
                Checkout
            </button>
            </form>
        </section>

        <section>
            <div className="product100">
            {/* <Logo /> */}
            <div className="description">
                <h3>5 questions a day</h3>
                <h5>₹100 / month</h5>
            </div>
            </div>
            <form action={server+"/create-checkout-session"} method="POST" >
            {/* Add a hidden field with the lookup_key of your Price */}
            <input type="hidden" name="lookup_key" value="100pm" />
            <input type="hidden" name="type" value="2" />
            <input type="hidden" name="email" value={user?.result?.email} />
            <button id="checkout-and-portal-button1" type="submit">
                Checkout
            </button>
            </form>
        </section>

        <section>
            <div className="product1000">
            {/* <Logo /> */}
            <div className="description">
                <h3>Unlimited questions </h3>
                <h5>₹1000 / month</h5>
            </div>
            </div>
            <form action={server+"/create-checkout-session"} method="POST" >
            {/* Add a hidden field with the lookup_key of your Price */}
            <input type="hidden" name="lookup_key" value="1000pm" />
            <input type="hidden" name="type" value="3" />
            <input type="hidden" name="email" value={user?.result?.email} />
            <button id="checkout-and-portal-button2" type="submit" >
                Checkout
            </button>
            </form>
        </section>
    </div>
 )
  
};

const SuccessDisplay = ({ sessionId }) => {
  return (
    <section>
      <div className="product Box-root">
        <Logo />
        <div className="description Box-root">
          <h3>Subscription plan successful!</h3>
        </div>
      </div>
      <form action={server+"/create-portal-session"} method="POST">
        <input
          type="hidden"
          id="session-id"
          name="session_id"
          value={sessionId}
        />
        <button id="checkout-and-portal-button" type="submit">
          Manage your billing information
        </button>
      </form>
    </section>
  );
};

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function ShowSubscription() {

  const user = useSelector((state) => state.currentUserReducer);
  // console.log(user);
  // const type = useSelector((state) => state.typeReducer)
  // console.log(type)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let [type, setType] = useState('1');
  let [message, setMessage] = useState('');
  let [success, setSuccess] = useState(false);
  let [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    console.log(query.get(success));

    if (query.get('success')) {
      setSuccess(true);
      setSessionId(query.get('session_id'));
    }

    if (query.get('canceled')) {
      setSuccess(false);
      setMessage(
        "Subscription canceled -- continue trying to subscribe and checkout when you're ready."
      );
    }

    if (query.get('type')) {
      setType(query.get('type'))
    }
  }, [sessionId]);

  if (!success && message === '') {
    return <ProductDisplay />;
  } else if (success && sessionId !== '') {
    console.log("success")
    console.log(user)
    dispatch(setNewSubscription(user?.result?._id, type));
    user.result.subscriptionDetails.mode = type;

    if(type === "1"){
      console.log("in type 1");
      // localStorage.setItem("quesLeft", 1);
      user.result.noOfQuestions = 1;
      user.result.subscriptionDetails.noOfQuestionsLeft = 1;
      // user.result.subscriptionDetails.subscribedOn = moment().format('YYYY-MM-DD');
      // user.result.subscriptionDetails.validDay = moment().format('YYYY-MM-DD');
      localStorage.setItem('Profile', JSON.stringify(user));
      // dispatch(setCurrentUser(user));
      console.log(user);
    }

    if(type === "2"){
      console.log("in type 2");
      localStorage.setItem("quesLeft", 5);
      user.result.noOfQuestions = 5;
      user.result.subscriptionDetails.noOfQuestionsLeft = 5;
      user.result.subscriptionDetails.subscribedOn = moment().format('YYYY-MM-DD');
      user.result.subscriptionDetails.validDay = moment().format('YYYY-MM-DD');
      localStorage.setItem('Profile', JSON.stringify(user));
      // dispatch(setCurrentUser(user));
      console.log(user);
    }

    if(type === "3"){
      console.log("in type 3");
      localStorage.setItem("quesLeft", 99999999);
      user.result.noOfQuestions = 99999999;
      user.result.subscriptionDetails.noOfQuestionsLeft = 99999999;
      user.result.subscriptionDetails.subscribedOn = moment().format('YYYY-MM-DD');
      user.result.subscriptionDetails.validDay = moment().format('YYYY-MM-DD');
      localStorage.setItem('Profile', JSON.stringify(user));
      // dispatch(setCurrentUser(user));
      console.log(user);
    }
    // navigate("/auth");
    return <SuccessDisplay sessionId={sessionId}/>;
  } else {
    return <Message message={message} />;
  }
}

const Logo = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="14px"
    height="16px"
    viewBox="0 0 14 16"
    version="1.1"
  >
    <defs />
    <g id="Flow" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
      <g
        id="0-Default"
        transform="translate(-121.000000, -40.000000)"
        fill="#E184DF"
      >
        <path
          d="M127,50 L126,50 C123.238576,50 121,47.7614237 121,45 C121,42.2385763 123.238576,40 126,40 L135,40 L135,56 L133,56 L133,42 L129,42 L129,56 L127,56 L127,50 Z M127,48 L127,42 L126,42 C124.343146,42 123,43.3431458 123,45 C123,46.6568542 124.343146,48 126,48 L127,48 Z"
          id="Pilcrow"
        />
      </g>
    </g>
  </svg>
);