import React, {FC, useState} from 'react';
import {Box, Button, Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {View} from 'react-native';
import {AuthLayout} from '../../../components/layout/AuthLayout';
import {AuthStackScreenProps} from '../../../navigation/types';
import {Colors} from '../../../utils/Colors';
import OTPInputView from './components/OTPTextInput';
import axios from 'axios';
import {API_URL} from '../../../lib/Constants';
import {createSession, restoreSession} from '../../../store/auth/authSlice';
import {showMessage} from 'react-native-flash-message';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch} from '../../../store';

type Props = AuthStackScreenProps<'OTP'>;

export const OTPScreen: FC<Props> = ({route}: any) => {
  const [otpValue, setOtpValue]: any = useState('');
  const navigation: any = useNavigation();
  const dispatch = useAppDispatch();

  const verifyOtpHandler = () => {
    try {
      axios
        .get(
          `${API_URL}verify-otp?mobile=${route.params?.phone}&otp=${otpValue}`,
        )
        .then(async res => {
          const userData = {
            userId: res.data?.details?.id,
          };
          await createSession(userData);
          navigation.navigate('BottomTabs');
          showMessage({
            message: 'Login successfully.',
            type: 'success',
          });
          dispatch(restoreSession());
        })
        .catch(err => console.log('err', err));
    } catch (error) {
      showMessage({
        message: 'Incorrect OTP, Please try again.',
        type: 'danger',
      });
    }
  };

  const resendOTPHandler = async () => {
    try {
      const response = await axios.get(
        `${API_URL}send-otp?mobile=${route.params?.phone}&country_code=+91`,
      );
      if (response?.status == 200) {
        showMessage({
          message: 'OTP resend successfully.',
          type: 'success',
        });
      }
    } catch (error) {
      showMessage({
        message: "This user doesn't exist.",
        type: 'danger',
      });
    }
  };

  return (
    <AuthLayout img={require('../../../assets/auth/OTP.png')}>
      <Box>
        <Text
          fontWeight={'600'}
          color={'primary.400'}
          fontSize={'xl'}
          mt={150}
          px={5}>
          Enter OTP
        </Text>
        <Text
          fontWeight={'600'}
          color={Colors.textColor}
          fontSize={'sm'}
          mb={3}
          px={5}>
          4 Digit OTP sent to your registered phone number
        </Text>

        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          <Box mx={4} my={5}>
            <OTPInputView
              autoFocus
              isInvalid={false}
              numberOfInput={4}
              onChangeText={text => setOtpValue(text)}
            />
          </Box>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              fontWeight={'500'}
              color={Colors.textColor}
              fontSize={'sm'}
              px={3}
              pt={3}
              textAlign={'center'}>
              OTP not received?
            </Text>
            <TouchableOpacity
              style={{paddingTop: 12}}
              onPress={resendOTPHandler}>
              <Text color={'primary.400'}>Resend OTP</Text>
            </TouchableOpacity>
          </View>
          <Button
            my={10}
            mx={6}
            _text={{fontWeight: '500', fontSize: 'md'}}
            onPress={verifyOtpHandler}>
            Verify OTP
          </Button>
        </KeyboardAwareScrollView>
      </Box>
    </AuthLayout>
  );
};
