import React from 'react';
import {useEffect, useRef, useState} from 'react';
import {Input, HStack} from 'native-base';
import {TextInput} from 'react-native';
import {Colors} from '../../../../utils/Colors';

type Props = {
  autoFocus: boolean;
  numberOfInput: number;
  onChangeText: (text: string) => void;
  isInvalid: boolean;
};

const OtpTextInput: React.FC<Props> = ({
  autoFocus = true,
  numberOfInput = 6,
  onChangeText,
  isInvalid = false,
}) => {
  const inputRef = useRef<TextInput[]>([]);
  const [inputValue, setInputValue] = useState<string[]>(
    new Array(numberOfInput).fill(''),
  );

  useEffect(() => {
    onChangeText(inputValue.join(''));
  }, [inputValue]);

  return (
    <HStack
      mb={2}
      space={5}
      justifyContent="space-between"
      w={'85%'}
      alignSelf={'center'}>
      {Array.from(Array(numberOfInput).keys()).map((_, index) => {
        return (
          <Input
            key={index}
            autoFocus={index === 0 && autoFocus}
            flex={1}
            ref={el => (inputRef.current[index] = el)}
            keyboardType="number-pad"
            w={45}
            h={50}
            variant="unstyled"
            colorScheme={'primary'}
            isInvalid={isInvalid}
            fontStyle={'normal'}
            fontWeight={'600'}
            fontFamily={'heading'}
            selectionColor={'primary.400'}
            color={'primary.400'}
            fontSize={'lg'}
            _focus={{
              borderBottomColor: 'primary.400',
            }}
            borderBottomWidth={2}
            borderBottomColor={Colors.grey}
            onChangeText={(value: string) => {
              if (Number.isNaN(+value)) {
                return;
              }
              setInputValue(prev => {
                const state = [...prev];
                state[index] = value.replace(/[^0-9]/g, '');
                return state;
              });
              if (value.length && index + 1 < numberOfInput) {
                inputRef.current[index + 1].focus();
              }
            }}
            onKeyPress={({nativeEvent}) => {
              if (
                inputValue[index].length === 1 &&
                nativeEvent.key !== 'Backspace' &&
                index + 1 !== numberOfInput &&
                !Number.isNaN(+nativeEvent.key)
              ) {
                inputRef.current[index + 1].focus();
                setInputValue(prev => {
                  const state = [...prev];
                  state[index + 1] = nativeEvent.key.replace(/[^0-9]/g, '');
                  return state;
                });
              }

              if (nativeEvent.key === 'Backspace' && index !== 0) {
                inputRef.current[index - 1].focus();
                setInputValue(prev => {
                  const state = [...prev];
                  state.forEach((_item, i) => {
                    if (i > index) {
                      state[i] = '';
                    }
                  });
                  return state;
                });
              }
            }}
            value={inputValue[index]}
            blurOnSubmit={false}
            maxLength={1}
            textAlign="center"
          />
        );
      })}
    </HStack>
  );
};
export default OtpTextInput;
