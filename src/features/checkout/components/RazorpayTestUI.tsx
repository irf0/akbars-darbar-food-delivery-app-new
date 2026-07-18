// // @ts-ignore - react-native-razorpay doesn't ship with official TS definitions
// import RazorpayCheckout from 'react-native-razorpay';

// export interface RazorpaySuccessResponse {
//   razorpay_payment_id: string;
//   razorpay_order_id: string;
//   razorpay_signature: string;
// }

// export interface RazorpayErrorResponse {
//   code: number;
//   description: string;
// }

// export const openRazorpayUi = async () => {
//   const options = {
//     description: '1x Butter Chicken, 2x Garlic Naan',
//     image: 'https://flaticon.com',
//     currency: 'INR',
//     key: 'rzp_live_TDhzAf5La795ue', // Test Key
//     amount: (340 * 100).toString(), // ₹340 in paise
//     name: "Akbar's Darbar",

//     prefill: {
//       name: 'Gaurav Kumar',
//       email: 'test.customer@example.com',
//       contact: '+917025824984',
//     },

//     theme: {
//       color: '#a90303',
//     },
//   };

//   try {
//     const payment = (await RazorpayCheckout.open(options)) as RazorpaySuccessResponse;

//     console.log('Payment Success', payment);

//     return payment;
//   } catch (error) {
//     console.log('Payment Failed', error);

//     throw error;
//   }
// };
