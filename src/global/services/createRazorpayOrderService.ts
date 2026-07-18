import functions from '@react-native-firebase/functions';

interface CartItemRequest {
  id: string;
  portion: 'half' | 'full';
  quantity: number;
}

interface CreateOrderRequest {
  cartItems: CartItemRequest[];
  orderType: 'delivery' | 'takeaway';
  addressId?: string;
  cookingInstructions?: string;
  deliveryInstructions?: string;
  takeawaySlot?: string;
  couponCode?: string;
}

interface CreateRazorpayOrderResponse {
  razorpay_order_id: string;
  amount: number;
  currency: string;
  order_id: string;
}

export const createRazorpayOrder = async (
  data: CreateOrderRequest,
): Promise<CreateRazorpayOrderResponse> => {
  const callable = functions().httpsCallable('createRazorpayOrder');
  const result = await callable(data);
  return result.data as CreateRazorpayOrderResponse;
};
