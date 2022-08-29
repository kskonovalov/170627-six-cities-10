import {Review} from '../types/types';
import {OffersSlice} from '../types/state';

const getLastNReviewsFilter = (reviews: OffersSlice['reviews'], count: number): OffersSlice['reviews'] => [...reviews].sort((review1: Review, review2: Review) => new Date(review2.date).getTime() - new Date(review1.date).getTime()).slice(0, count);

export default getLastNReviewsFilter;
