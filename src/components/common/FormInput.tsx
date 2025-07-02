import React, {FC} from 'react';
import {TextInputProps} from 'react-native';
import {FormControl, Icon, Input, Pressable} from 'native-base';
import {Colors} from '../../utils/Colors';

type Props = TextInputProps & {
  error?: string;
  isInvalid?: boolean;
  show?: boolean;
  helperText?: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  icon?: any;
  iconName1?: string;
  iconName2?: string;
  label?: string;
  onPressHandler?: () => void;
  fontStyle?: string;
};

export const FormInput: FC<Props> = ({
  error,
  isInvalid = false,
  helperText,
  onChangeText,
  placeholder,
  icon,
  iconName1,
  iconName2,
  label,
  onPressHandler,
  show,
  ...restProps
}) => {
  return (
    <FormControl isInvalid={isInvalid} mb={3}>
      <FormControl.Label
        _text={{
          fontWeight: '600',
          fontStyle: 'normal',
          fontSize: 'sm',
          color: 'black',
        }}>
        {label}
      </FormControl.Label>
      <Input
        {...restProps}
        _input={{
          selectionColor: '#000',
          cursorColor: '#000',
        }}
        placeholder={placeholder}
        variant="unstyled"
        focusOutlineColor={'primary.400'}
        colorScheme={'primary'}
        color={'black'}
        fontFamily="body"
        fontSize={'sm'}
        bg={Colors.lightBg}
        cursorColor={'#000'}
        selectionColor={Colors.grey}
        onChangeText={onChangeText}
        InputRightElement={
          <Pressable onPress={onPressHandler}>
            <Icon
              as={icon}
              name={show ? iconName1 : iconName2}
              size={5}
              mr="2"
              color="secondary.400"
            />
          </Pressable>
        }
      />
      {helperText ? (
        <FormControl.HelperText>{helperText}</FormControl.HelperText>
      ) : null}
      <FormControl.ErrorMessage>{error}</FormControl.ErrorMessage>
    </FormControl>
  );
};
