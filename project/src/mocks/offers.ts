export type OfferType = {
  id: string,
  isPremium: boolean,
  image: string,
  price: number,
  rating: number,
  title: string,
  type: string,
}

const offers: OfferType[] = [
  {
    id: 'offer1',
    isPremium: true,
    image: 'img/apartment-01.jpg',
    price: 120,
    rating: 80,
    title: 'Beautiful &amp; luxurious apartment at great location',
    type: 'Apartment',
  },
  {
    id: 'offer2',
    isPremium: false,
    image: 'img/room.jpg',
    price: 80,
    rating: 80,
    title: 'Wood and stone place',
    type: 'Private room',
  },
  {
    id: 'offer3',
    isPremium: false,
    image: 'img/apartment-02.jpg',
    price: 132,
    rating: 80,
    title: 'Canal View Prinsengracht',
    type: 'Apartment',
  },
  {
    id: 'offer4',
    isPremium: true,
    image: 'img/apartment-03.jpg',
    price: 180,
    rating: 100,
    title: 'Nice, cozy, warm big bed apartment',
    type: 'Apartment',
  }
];

export default offers;
