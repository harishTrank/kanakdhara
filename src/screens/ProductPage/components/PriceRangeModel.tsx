import React, {useEffect, useState} from 'react';
import {Actionsheet, Button, HStack, Input} from 'native-base';
import {Keyboard, Platform, View} from "react-native";

export const PriceRangeModal: any = ({price, onClosePrice, setPriceRange}: any) => {
  const [cachePriceRange, setCachePriceRange]: any = useState({
    max: "",
    min: ""
  });

  // keyboard handler case ---------------------
  const [keyboardHeight, setKeyboardHeight]: any = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidShow' : 'keyboardWillShow',
      (event: any) => {
        const keyboardHeight = event.endCoordinates.height;
        setKeyboardHeight(keyboardHeight);
        console.log('Keyboard height:', keyboardHeight);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      Platform.OS === 'android' ? 'keyboardDidHide' : 'keyboardWillHide',
      () => {
        setKeyboardHeight(0);
        console.log('Keyboard hidden');
      }
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  // -------------------------------------------
  return (
    <>
      <Actionsheet isOpen={price} onClose={onClosePrice}>
        <Actionsheet.Content bg={'#F7F7F7'}>
          <View style={[keyboardHeight && keyboardHeight !== 0 && {
            marginBottom: keyboardHeight
          }]}>
            <HStack
              w={'100%'}
              alignSelf={'center'}
              justifyContent={'space-between'}
              flexDirection={'row'}
              p={5}>
                <Input
                  variant="filled"
                  placeholder="Min"
                  colorScheme={'white'}
                  borderColor={'#f3f3f3'}
                  backgroundColor={'white'}
                  shadow={2}
                  value={cachePriceRange.min}
                  onChangeText={text => setCachePriceRange((oldVal: any) => {
                    return {...oldVal, min: text}
                  })}
                  w={'48%'}
                />
                <Input
                  variant="filled"
                  placeholder="Max"
                  borderColor={'#f3f3f3'}
                  shadow={2}
                  backgroundColor={'white'}
                  w={'48%'}
                  colorScheme={'white'}
                  value={cachePriceRange.max}
                  onChangeText={text => setCachePriceRange((oldVal: any) => {
                    return {...oldVal, max: text}
                  })}
                />
            </HStack>
            <Button my={2} alignSelf={'flex-end'} w={'25%'} variant="solid" onPress={() => {
              setPriceRange(cachePriceRange);
              onClosePrice(false);
            }}>
              Apply
            </Button>
          </View>
        </Actionsheet.Content>
      </Actionsheet>
    </>
  );
};
