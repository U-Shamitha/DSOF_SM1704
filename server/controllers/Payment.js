import Stripe from 'stripe'
const stripe = new Stripe('sk_test_51MiCr7SIXsHnK2VWtTFt5LqZTWuiVsn4JNnAarH1noQ1JMuvfbmgjEYYZFWdSZZENjiAn6Emd8Hky661Y2Gkb4yi00w99HD2dk')

export const doPayment = async(req, res) => {
    let {amount, id} = req.body;
    try{
        const payment = await stripe.paymentIntents.create({
            amount,
            currency: "USD",
            description: "No description",
            payment_method: id,
            confirm: true
        })
        console.log("Payment", payment);
        res.json({
            message: "Payment successful",
            success: true
        })


    }catch(error){
        console.log("Error", error);
        res.json({
            message: "Payment failed",
            success: false
        })
    }
}

export const createSubscription = async(req,res) => {

  console.log(req.name)
  console.log(req.email)
  console.log(req.priceId)
  console.log(req.paymentMethod)

    // create a stripe customer
    const customer = await stripe.customers.create({
        name: req.name,
        email: req.email,
        payment_method: req.paymentMethod,
        invoice_settings: {
          default_payment_method: req.paymentMethod,
        },
      });

    // get the price id from the front-end
    const priceId = req.priceId;

    // create a stripe subscription
    const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: priceId }],
        payment_settings: {
          payment_method_options: {
            card: {
              request_three_d_secure: 'any',
            },
          },
          payment_method_types: ['card'],
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent'],
      });

      // return the client secret and subscription id
    return {
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscriptionId: subscription.id,
      };

}