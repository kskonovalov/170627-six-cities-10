import {faker} from '@faker-js/faker';

import {Offer} from '../types/types';

const createMockOffer = (): Offer => ({
  'city': {
    'name': faker.address.city(),
    'location': {
      'latitude': faker.datatype.number(),
      'longitude': faker.datatype.number(),
      'zoom': faker.datatype.number()
    }
  },
  'previewImage': faker.image.abstract(),
  'images': new Array(faker.datatype.number({min: 1, max: 6})).fill(null).map(() => faker.image.abstract()),
  'title': faker.hacker.adjective(),
  'isFavorite': faker.datatype.boolean(),
  'isPremium': faker.datatype.boolean(),
  'rating': faker.datatype.number(),
  'type': faker.hacker.adjective(),
  'bedrooms': faker.datatype.number(),
  'maxAdults': faker.datatype.number(),
  'price': faker.datatype.number(),
  'goods': new Array(faker.datatype.number({min: 1, max: 5})).fill(null).map(() => faker.hacker.adjective()),
  'host': {
    'id': faker.datatype.number(),
    'name': faker.hacker.adjective(),
    'isPro': faker.datatype.boolean(),
    'avatarUrl': faker.image.abstract()
  },
  'description': faker.lorem.paragraph(),
  'location': {
    'latitude': faker.datatype.number(),
    'longitude': faker.datatype.number(),
    'zoom': faker.datatype.number()
  },
  'id': faker.datatype.number()
});

export default createMockOffer;
