import React from 'react';
import {Button} from 'native-base';

const YellowButton = ({onPress, title}: any) => {
  return (
    <Button
      onPress={onPress}
      alignSelf={'center'}
      borderRadius={10}
      w={110}
      mt={5}
      _text={{
        fontWeight: '500',
        fontSize: 14,
        fontFamily: 'Nunito-Bold',
      }}>
      {title}
    </Button>
  );
};

export default YellowButton;
