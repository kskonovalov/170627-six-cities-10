import {faker} from '@faker-js/faker';
import {Review} from '../types/types';

const createMockReview = (): Review => ({
  comment: faker.lorem.paragraph(),
  date: faker.date.recent().toString(),
  id: faker.datatype.number(),
  rating: faker.datatype.number({min: 0, max: 5}),
  user: {
    avatarUrl: faker.image.abstract(),
    id: faker.datatype.number(),
    isPro: faker.datatype.boolean(),
    name: faker.hacker.adjective()
  }
});

export default createMockReview;
