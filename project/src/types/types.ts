export type City = {
  title: string,
  lat: number,
  lng: number
};

export type Point = {
  title: string,
  lat: number,
  lng: number,
  id: number
};

export type Points = Point[];

export type Location = {
  'latitude': number,
  'longitude': number,
  'zoom': number
}

export type Offer = {
  'city': {
    'name': string,
    'location': Location
  },
  'previewImage': string,
  'images': string[],
  'title': string,
  'isFavorite': boolean,
  'isPremium': boolean,
  'rating': number,
  'type': string,
  'bedrooms': number,
  'maxAdults': number,
  'price': number,
  'goods': string[],
  'host': {
    'id': number,
    'name': string,
    'isPro': boolean,
    'avatarUrl': string
  },
  'description': string,
  'location': Location,
  'id': number
}

export type Review = {
  comment: string
  date: string
  id: number
  rating: number
  user: {
    avatarUrl: string
    id: number
    isPro: boolean
    name: string
  }
}

export type CardWrapProps = {
  offer: Offer,
  isActive: boolean,
  setCardActive: (id: number) => void,
  setCardInactive: () => void,
  cardType: string
};
