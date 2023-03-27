import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51MiCr7SIXsHnK2VWtTFt5LqZTWuiVsn4JNnAarH1noQ1JMuvfbmgjEYYZFWdSZZENjiAn6Emd8Hky661Y2Gkb4yi00w99HD2dk')
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import userRoutes from './routes/Users.js'
import questionRoutes from './routes/Questions.js'
import answerRoutes from './routes/Answers.js'//Answer-2
import { doPayment } from './controllers/Payment.js';
import { createSubscription } from './controllers/Payment.js';

//otp
import otpRoutes from './otp/route.js';

const app = express();
dotenv.config();
app.use(express.json({limit: "30mb", extended: true})) //reply to request with the help of json
app.use(express.urlencoded({limit: "30mb", extended: true}))
app.use(cors()) //to eliminate the error caused when one port sends request to other, cors is used as middleware

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true}))


app.get('/',(req,res) => {
    res.send("This is a stack overflow clone API")
})

//api for authentication
app.use('/user', userRoutes) //userRoutes is middle ware it contains lot of options for path after "/user"
app.use('/questions', questionRoutes)//ask ang get qestions
app.use('/answer', answerRoutes)//Answer-1

app.post("/payment", cors(), doPayment);
app.post('/create-subscription', createSubscription); 

const PORT = process.env.PORT || 5000 

const DATABASE_URL = process.env.CONNECTION_URL;

mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => app.listen(PORT, () => {console.log(`server running on ${PORT}`)}))
.catch((err) => console.log(err.message))



/************************** subscription ********************************/

// This is your test secret API key.
// const stripe = require('stripe')('sk_test_51MiCr7SIXsHnK2VWtTFt5LqZTWuiVsn4JNnAarH1noQ1JMuvfbmgjEYYZFWdSZZENjiAn6Emd8Hky661Y2Gkb4yi00w99HD2dk');
// const express = require('express');
// const app = express();
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


const YOUR_DOMAIN = 'https://stackoverflow-client-kgjp.onrender.com/Subscription';

app.post('/create-checkout-session', async (req, res) => {
  console.log(req.body.lookup_key)
  const prices = await stripe.prices.list({
    lookup_keys: [req.body.lookup_key],
    expand: ['data.product'],
    // metadata: { customerEmail: req.body.email }, // NOTICE HERE!
  });

// //get subscription list of the customer
// const subscription = await this.stripe.subscriptions.search({
//   query: `status:'active' AND metadata['customerEmail']:'${req.body.email}'`,
// });
console.log(prices);

  // console.log(prices);
  const session = await stripe.checkout.sessions.create({
    billing_address_collection: 'auto',
    line_items: [
      {
        price: prices.data[0].id,
        // For metered billing, do not pass quantity
        quantity: 1,

      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}/true/{CHECKOUT_SESSION_ID}/${req.body.type}`,
    cancel_url: `${YOUR_DOMAIN}/true`,
  });

  res.redirect(303, session.url);
});

app.post('/create-portal-session', async (req, res) => {
  // For demonstration purposes, we're using the Checkout session to retrieve the customer ID.
  // Typically this is stored alongside the authenticated user in your database.
  const { session_id } = req.body;
  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id);

  // This is the url to which the customer will be redirected when they are done
  // managing their billing with the portal.
  const returnUrl = YOUR_DOMAIN;

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: checkoutSession.customer,
    return_url: returnUrl,
  });

  res.redirect(303, portalSession.url);
});

app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (request, response) => {
    let event = request.body;
    // Replace this endpoint secret with your endpoint's unique secret
    // If you are testing with the CLI, find the secret by running 'stripe listen'
    // If you are using an endpoint defined with the API or dashboard, look in your webhook settings
    // at https://dashboard.stripe.com/webhooks
    const endpointSecret = 'whsec_12345';
    // Only verify the event if you have an endpoint secret defined.
    // Otherwise use the basic event deserialized with JSON.parse
    if (endpointSecret) {
      // Get the signature sent by Stripe
      const signature = request.headers['stripe-signature'];
      try {
        event = stripe.webhooks.constructEvent(
          request.body,
          signature,
          endpointSecret
        );
      } catch (err) {
        console.log(`⚠️  Webhook signature verification failed.`, err.message);
        return response.sendStatus(400);
      }
    }
    let subscription;
    let status;
    // Handle the event
    switch (event.type) {
      case 'customer.subscription.trial_will_end':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription trial ending.
        // handleSubscriptionTrialEnding(subscription);
        break;
      case 'customer.subscription.deleted':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription deleted.
        // handleSubscriptionDeleted(subscriptionDeleted);
        break;
      case 'customer.subscription.created':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription created.
        // handleSubscriptionCreated(subscription);
        break;
      case 'customer.subscription.updated':
        subscription = event.data.object;
        status = subscription.status;
        console.log(`Subscription status is ${status}.`);
        // Then define and call a method to handle the subscription update.
        // handleSubscriptionUpdated(subscription);
        break;
      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  }
);

// app.listen(4242, () => console.log('Running on port 4242'));



    
//************************************************   Chatbot   *********************************************************/
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const response = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Say this is a test",
  max_tokens: 7,
  temperature: 0,
});
// console.log(response);

app.post('/create-chat-completion', async (req, res) => {
  try{
  console.log("*********************************************************************************")
  console.log(req.body.prompt)
  const completion = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{role: "user", content: req.body.prompt }],
  });
  console.log(completion.data.choices[0].message);
  const content = completion.data.choices[0].message.content;
  res.status(200).json({message : content});
}catch(err){
  console.log(err)
}

});

//************************************************ otp **************************************************/
app.use('/otp', otpRoutes);
