export type reviewType = {
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

const reviews: reviewType[] = [
  {
    'comment': 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
    'date': 'Mon Jul 18 2022 17:36:17 GMT+0200 (Central European Summer Time)',
    'id': 1,
    'rating': 4,
    'user': {
      'avatarUrl': 'img/avatar-max.jpg',
      'id': 1,
      'isPro': false,
      'name': 'Oliver.conner'
    }
  }
];

export default reviews;
