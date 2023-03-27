import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
// import './AppSp.css';


const totalPrice = 1400; //this means 14 usd and can also be calculated at the backend or from the items

export const MyCheckOutForm = () => {

    const [succeeded, setSucceeded] = useState(false);
    const [error, SetError] = useState(null);
    const [processing, setProcessing] = useState("");
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState("");
    const [des,setDes] = useState("No description");
    const [name,setName] = useState("No user");
    const [address,setAddress] = useState("No address");

    const stripe = useStripe();
    const elements = useElements();

    //STEP 1: create a payment intent and getting the secret
    useEffect(() => {
        fetch("http://localhost:5001/create-payment-intent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ price: totalPrice})
        })
        .then(res => res.json())
        .then((data) => {
            console.log(data);
            setClientSecret(data.clientSecret); // setting the client secret here
        });
    }, []);

    const cardStyle = {
        style: {}
    };

   

    //STEP 2: make the payment after filling the form properly 
    
    //handle input errors
    const handleChange = async (event) => {
        console.log(event)
        setDisabled(event.empty);
        SetError(event.error ? event.error.message : "");
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);
        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        });
        if (payload.error){
            SetError(`Payment failed ${payload.error.message}`);
            setProcessing(false);
            setSucceeded(true);
        }
    }

    return(
        <form className='.formSp' id="payment-form" onSubmit={handleSubmit}>
            <label htmlFor="price">Amount</label>
            <input className="inputSp"id="price" placeholder="100" disabled style={{marginTop:"10px",marginBottom:"20px"}} />
            <label htmlFor="price">Description</label>
            <input className="inputSp"id="des" placeholder="Enter description" style={{marginTop:"10px",marginBottom:"20px"}} onChange={(e)=>setDes(e.target.value)}/>
            <label htmlFor="price">Shipping</label>
            <input className="inputSp"id="name" placeholder="Enter your name"style={{marginTop:"10px"}} onChange={(e)=>setName(e.target.value)}/>
            <input className="inputSp"id="adress" placeholder="Enter address" style={{marginTop:"10px"}} onChange={(e)=>setAddress(e.target.value)}/>
            
            <CardElement 
                id="card-element" 
                options={cardStyle}
                onChange={handleChange} 
            /> 
            
            <button className='buttonSp' disabled={processing || disabled || succeeded} id="submit">
                <span id="button-text">
                    {processing ? (
                        <div className='spinner' id='spinner'></div>
                    ) : (
                        "Pay now"
                    )}
                </span>
            </button>
            {error && (
                <div className='card-error' role="alert">
                    {error}
                </div>
            )}
            <p className={succeeded ? 'result-message' : 'result-message hidden'}>
                Payment succeeded, see the result in your
                <a href={`https://dashboard.stripe.com/test/payments`}>
                    {" "}
                    Stripe dashboard
                </a>
                Refresh the page to pay again
            </p>
        </form>
    );
};
