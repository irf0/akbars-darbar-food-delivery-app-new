import { useEffect } from 'react';
import { subscribeToUserReviews } from 'src/global/services/reviewService';
import { useReviewsStore } from '../store/useReviewsStore';

export const useUserReviews = (uid: string | undefined) => {
  const setReviewedOrderIds = useReviewsStore((state) => state.setReviewedOrderIds);

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = subscribeToUserReviews(uid, setReviewedOrderIds, (error) =>
      console.error('Reviews snapshot error:', error),
    );

    return () => unsubscribe();
  }, [uid, setReviewedOrderIds]);
};
