import { create } from 'zustand';

interface ReviewsStoreState {
  reviewedOrderIds: Set<string>;
  setReviewedOrderIds: (ids: Set<string>) => void;
}

export const useReviewsStore = create<ReviewsStoreState>((set) => ({
  reviewedOrderIds: new Set(),
  setReviewedOrderIds: (ids) => set({ reviewedOrderIds: ids }),
}));
