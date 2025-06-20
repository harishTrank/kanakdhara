import {ImageSourcePropType} from 'react-native';

export type SliderDataItem = {
  id: string;
  title: string;
  text: string;
  image: ImageSourcePropType;
};

export const SliderData = [
  {
    id: '1',
    title: 'Welcome to Kanak Dhara',
    text: 'Discover exquisite jewellery pieces\ncurated just for you.',
    image: require('../assets/auth/slider1.png'),
  },
  {
    id: '2',
    title: 'Personalize Your Experience',
    text: 'Let us know your preferences, so we can\ntailor our recommendations for you.',
    image: require('../assets/auth/slider2.png'),
  },
  {
    id: '3',
    title: 'Join Committee',
    text: 'Simplify committee management and\ncollaboration with our powerful app.',
    image: require('../assets/auth/slider3.png'),
  },
];
