import React, {FC} from 'react';
import {TextInputProps} from 'react-native';
// Note: Ensure native-base is imported correctly
import {FormControl, Icon, Input, Pressable} from 'native-base';

// Placeholder for your external Colors utility
// You must ensure this path and its content are correct in your project.
import {Colors} from '../../utils/Colors';

// Define the type for the props
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
        placeholder={placeholder}
        variant="unstyled"
        // Removed: focusOutlineColor={'primary.400'} as it triggers the bug

        colorScheme={'primary'}
        color={'black'}
        fontFamily="body"
        fontSize={'sm'}
        bg={Colors.lightBg}
        cursorColor={'#000'}
        selectionColor={Colors.grey}
        onChangeText={onChangeText}
        // AGGRESSIVE FIX 1: Target the inner TextInput element
        _input={{
          selectionColor: '#000',
          cursorColor: '#000',
          // Explicitly set focus styles for the inner element
          _focus: {
            outlineWidth: 0,
            borderWidth: 0,
          } as any,
        }}
        // AGGRESSIVE FIX 2: Target the outer view container (using 'as any' for TypeScript)
        _focus={
          {
            // This is the primary runtime fix for the Java/Android error
            outlineWidth: 0,
            borderWidth: 0,
            // Double-check with a style object override
            style: {outlineWidth: 0, borderWidth: 0},
          } as any
        }
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
