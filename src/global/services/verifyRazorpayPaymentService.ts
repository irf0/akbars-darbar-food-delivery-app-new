import functions from '@react-native-firebase/functions';

interface VerifyRazorpayPaymentRequest {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface VerifyRazorpayPaymentResponse {
  success: boolean;
  order_id: string;
}

export const verifyRazorpayPayment = async (
  data: VerifyRazorpayPaymentRequest,
): Promise<VerifyRazorpayPaymentResponse> => {
  const callable = functions().httpsCallable('verifyRazorpayPayment');
  const result = await callable(data);
  return result.data as VerifyRazorpayPaymentResponse;
};
