import React from 'react';
import {HStack, Image} from 'native-base';

const ShowOffStyleBanners = () => {
  const ImageStylesComponent = ({image}: any) => {
    return (
      <Image
        source={image}
        alt={'no img'}
        w={'30%'}
        h={150}
        resizeMode={'cover'}
        borderRadius={5}
      />
    );
  };
  return (
    <>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        px={5}
        pb={5}>
        <ImageStylesComponent
          image={require('../../../assets/homeBanner/user2.png')}
        />
        <ImageStylesComponent
          image={require('../../../assets/homeBanner/user1.png')}
        />
        <ImageStylesComponent
          image={require('../../../assets/homeBanner/user3.png')}
        />
      </HStack>
      <HStack
        alignItems={'center'}
        justifyContent={'space-between'}
        px={5}
        pb={5}>
        <ImageStylesComponent
          image={require('../../../assets/homeBanner/user4.png')}
        />
        <ImageStylesComponent
          image={require('../../../assets/homeBanner/user5.png')}
        />
        <ImageStylesComponent
          image={require('../../../assets/homeBanner/user6.png')}
        />
      </HStack>
    </>
  );
};

export default ShowOffStyleBanners;
