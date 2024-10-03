// 'use client'
// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import {useCreatePaymentIntentMutation} from '../../../redux/api/paymentApi'
// import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

// const PaymentForm = ({ appointmentId, email, amount }) => {
//   const [createPaymentIntent] = useCreatePaymentIntentMutation();
//   const stripe = useStripe();
//   const elements = useElements();
//   const [error, setError] = useState(null);
//   const [succeeded, setSucceeded] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await createPaymentIntent({ appointmentId, email, amount }).unwrap();
//       const { clientSecret } = data;

//       const paymentResult = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: elements.getElement(CardElement),
//           billing_details: {
//             email,
//           },
//         },
//       });

//       if (paymentResult.error) {
//         setError(paymentResult.error.message);
//       } else {
//         setSucceeded(true);
//       }
//     } catch (err) {
//       setError('Payment failed');
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <CardElement />
//       <button type="submit" disabled={!stripe || succeeded}>
//         Pay ${amount}
//       </button>
//       {error && <div>{error}</div>}
//       {succeeded && <div>Payment succeeded!</div>}
//     </form>
//   );
// };

// // Wrapping component with Elements for Stripe
// const StripePayment = (props) => (
//   <Elements stripe={stripePromise}>
//     <PaymentForm {...props} />
//   </Elements>
// );

// export default StripePayment;

import { CircleCheckBig } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaymentPage = () => {
  return (
      <div className="flex items-center justify-center h-[80vh]  bg-gray-100 ">
        <div className="bg-white p-10 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center justify-center mb-6">
            <CircleCheckBig
              className="h-12 w-12 text-green-600"
              aria-hidden="true"
            />
          </div>
          <h2 className="text-2xl font-semibold text-blue-600 mb-4 text-center">
            Appointment Confirmed!
          </h2>
          <p className="text-gray-600 mb-4 text-center">
            Your appointment has been successfully booked. Please proceed to
            payment to confirm your slot.
          </p>
          <p className="text-green-600 my-3 text-lg font-medium text-center">
            Payment integration will be added shortly...
          </p>
          <Link href="/" className="w-full inline-block text-center bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
            Go to Homepage
          </Link>
        </div>
      </div>
  );
};
export default PaymentPage;
