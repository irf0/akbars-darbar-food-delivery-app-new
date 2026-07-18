import functions from '@react-native-firebase/functions';

interface CartItemRequest {
  id: string;
  portion: 'half' | 'full';
  quantity: number;
}

interface CreateCodOrderRequest {
  cartItems: CartItemRequest[];
  orderType: 'takeaway';
  cookingInstructions?: string;
  takeawaySlot?: string;
  couponCode?: string;
}

interface CreateCodOrderResponse {
  success: boolean;
  order_id: string;
  order_number: string;
}

export const createCodOrder = async (
  data: CreateCodOrderRequest,
): Promise<CreateCodOrderResponse> => {
  const callable = functions().httpsCallable('createCodOrderHandler');
  const result = await callable(data);
  return result.data as CreateCodOrderResponse;
};
