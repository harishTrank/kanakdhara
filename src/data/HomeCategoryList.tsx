import {ImageSourcePropType} from 'react-native';

export type HomeCategoryItem = {
  id: string;
  image: ImageSourcePropType;
  name: string;
};

export const HomeCategoryList = [
  {id: '1', image: require('../assets/category/All.png'), name: 'All'},
  {id: '2', image: require('../assets/category/Rings.png'), name: 'Rings'},
  {id: '3', image: require('../assets/category/Pendent.png'), name: 'Pendent'},
  {id: '4', image: require('../assets/category/Bangles.png'), name: 'Bangles'},
  {
    id: '5',
    image: require('../assets/category/Earrings.png'),
    name: 'Earrings',
  },
  {
    id: '6',
    image: require('../assets/category/Necklace.png'),
    name: 'Necklace',
  },
  {id: '7', image: require('../assets/category/NosePin.png'), name: 'NosePin'},
];
