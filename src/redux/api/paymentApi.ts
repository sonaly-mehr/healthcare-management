import { baseApi } from './baseApi';
import { tagTypes } from '../tag-types';

const paymentApi = baseApi.injectEndpoints({
   endpoints: (build) => ({
      createPaymentSession: build.mutation<{ id: string; url: string }, { appointmentId: string }>({
         query: ({ appointmentId }) => ({
           url: '/payment/create-payment-session', // Your backend route to create a Stripe session
           method: 'POST',
           body: { appointmentId },
         }),
         invalidatesTags: [tagTypes.payment],
      }),
   }),
});

export const { useCreatePaymentSessionMutation } = paymentApi;

export default paymentApi;