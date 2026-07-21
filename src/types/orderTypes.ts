import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export type OrderType = 'delivery' | 'takeaway';
export type Portion = 'half' | 'full';
export type PaymentStatus = 'paid' | 'refunded' | 'cod_pending';
export type OrderStatus = 'placed' | 'preparing' | 'ready' | 'completed' | 'cancelled';
export type CouponType = 'flat' | 'percentage';

export interface OrderLineItem {
  id: string;
  name: string;
  portion: Portion;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

export interface AppliedCoupon {
  code: string;
  type: CouponType;
  value: number;
}

export interface BillBreakdown {
  itemsSubtotal: number;
  deliveryCharge: number;
  packingCharge: number;
  platformFee: number;
  discount: number;
  total: number;
  cgstAmount: number;
  sgstAmount: number;
  appliedCoupon: AppliedCoupon | null;
}

export interface OrderDoc {
  uid: string;
  orderType: OrderType;
  addressId: string | null;
  lineItems: OrderLineItem[];
  bill: BillBreakdown;
  cookingInstructions: string | null;
  deliveryInstructions: string | null;
  takeawaySlot: string | null;
  currency: 'INR';
  razorpayOrderId: string | null;
  razorpayPaymentId: string | null;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  orderNumber: string;
  deliveryOtp: string;
  createdAt: FirebaseFirestoreTypes.Timestamp;
}
