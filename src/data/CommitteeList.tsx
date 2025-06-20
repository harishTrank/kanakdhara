import {ImageSourcePropType} from 'react-native';

export type CommitteeItem = {
  id: string;
  heading: string;
  subHeading: string;
  banner: ImageSourcePropType;
};
export const CommitteeList = [
  {
    id: '1',
    heading: 'Monthly Committee',
    subHeading: 'Entry Fee ₹1000 and get a chance to win ₹12000',
    banner: require('../assets/committee/banner1.png'),
  },
  {
    id: '2',
    heading: 'Weekly Committee',
    subHeading: 'Entry Fee ₹500 and get a chance to win ₹8000',
    banner: require('../assets/committee/banner2.png'),
  },
  {
    id: '3',
    heading: 'Daily Committee',
    subHeading: 'Entry Fee ₹100 and get a chance to win ₹5000',
    banner: require('../assets/committee/banner3.png'),
  },
];
