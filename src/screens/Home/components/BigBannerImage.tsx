import React from 'react';
import {Image} from 'native-base';

const BigBannerImage = ({image}: any) => {
  return (
    <Image
      source={image}
      w={'95%'}
      h={120}
      resizeMode={'cover'}
      borderRadius={5}
      mb={3}
      alignSelf={'center'}
      alt={'no banner'}
    />
  );
};

export default BigBannerImage;
