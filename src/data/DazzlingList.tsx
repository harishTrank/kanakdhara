import {ImageSourcePropType} from 'react-native';

export type DazzlingItem = {
  id: string;
  img: ImageSourcePropType;
  title: string;
};

export const DazzlingList = [
  {
    id: '1',
    img: require('../assets/Dazzling/1.png'),
    title: 'Matrimonial Gems\nCollection',
  },
  {
    id: '2',
    img: require('../assets/Dazzling/2.png'),
    title: 'Gala Glamour\nCollection',
  },
  {
    id: '3',
    img: require('../assets/Dazzling/3.png'),
    title: 'Relaxed Radiance\nCollection',
  },
  {
    id: '4',
    img: require('../assets/Dazzling/4.png'),
    title: 'Global Treasures\nCollection',
  },
];

export type TopSellingItem = {
  id: string;
  img: ImageSourcePropType;
  title: string;
  discountedPrice: string;
  actualPrice: string;
  percentageOff: string;
};

export const TopSellingList = [
  {
    id: '1',
    img: require('../assets/homeBanner/9.png'),
    title: 'Eternal Bliss',
    discountedPrice: '₹56000',
    actualPrice: '₹59000',
    percentageOff: '20% off',
  },
  {
    id: '2',
    img: require('../assets/homeBanner/10.png'),
    title: 'Lumière Luxe',
    discountedPrice: '₹36000',
    actualPrice: '',
    percentageOff: '',
  },
  {
    id: '3',
    img: require('../assets/homeBanner/11.png'),
    title: 'Jewel Haven',
    discountedPrice: '₹66000',
    actualPrice: '₹70000',
    percentageOff: '20% off',
  },
  {
    id: '4',
    img: require('../assets/homeBanner/12.png'),
    title: 'Celestial Charms',
    discountedPrice: '₹136000',
    actualPrice: '',
    percentageOff: '',
  },
];

export type TrendingItem = {
  id: string;
  img: ImageSourcePropType;
  title: string;
  price: string;
  soldItems: string;
};

export const TrendingList = [
  {
    id: '1',
    img: require('../assets/homeBanner/13.png'),
    title: 'Artisan Aura',
    price: '₹24000',
    soldItems: '126 Sold',
  },
  {
    id: '2',
    img: require('../assets/homeBanner/14.png'),
    title: 'Dreamweaver Dreamweaver',
    price: '₹46000',
    soldItems: '101 Sold',
  },
  {
    id: '3',
    img: require('../assets/homeBanner/15.png'),
    title: 'Jewel Haven',
    price: '₹76000',
    soldItems: '121 Sold',
  },
  {
    id: '4',
    img: require('../assets/homeBanner/16.png'),
    title: 'Sparkle Grace',
    price: '₹36000',
    soldItems: '40 Sold',
  },
];
