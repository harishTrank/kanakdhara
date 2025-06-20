import React, {FC} from 'react';
import {Box, Button, Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import {Formik} from 'formik';
import {AuthStackScreenProps} from '../../../navigation/types';
import {AuthLayout} from '../../../components/layout/AuthLayout';
import {Colors} from '../../../utils/Colors';
import {FormInput} from '../../../components/common/FormInput';
import {LoginPayload} from '../../../store/auth/types';
import {API_URL} from '../../../lib/Constants';
import axios from 'axios';
import {showMessage} from 'react-native-flash-message';

type Props = AuthStackScreenProps<'Login'>;

export const LoginScreen: FC<Props> = ({navigation}: any) => {
  const initialValues: any = {
    phone: '',
  };

  const validationSchema = Yup.object().shape({
    phone: Yup.string().required('Phone number is required'),
  });

  const onSubmit = async ({phone}: LoginPayload) => {
    try {
      const response = await axios.get(
        `${API_URL}send-otp?mobile=${phone}&country_code=+91`,
      );
      if (response?.status == 200) {
        navigation.navigate('OTP', {phone});
        showMessage({
          message: 'OTP send successfully.',
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
    <AuthLayout img={require('../../../assets/auth/Login.png')}>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}>
        {({
          touched,
          values,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }: any) => {
          return (
            <Box px={3}>
              <Text
                fontWeight={'600'}
                color={'primary.400'}
                fontSize={'xl'}
                mt={150}
                px={3}>
                Log in / Sign In
              </Text>
              <Text
                fontWeight={'600'}
                color={Colors.textColor}
                fontSize={'sm'}
                mb={3}
                px={3}>
                Welcome back!
              </Text>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <Box px={5}>
                  <FormInput
                    isInvalid={touched.phone && 'phone' in errors}
                    onChangeText={handleChange('phone')}
                    placeholder={'Enter Mobile Number'}
                    error={errors?.phone}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    selectionColor={Colors.primary}
                    label={'Mobile Number'}
                    maxLength={10}
                    keyboardType={'number-pad'}
                  />
                </Box>
                <Text
                  fontWeight={'500'}
                  color={Colors.textColor}
                  fontSize={'sm'}
                  px={3}
                  mt={5}
                  textAlign={'center'}>
                  By Continuing, I agree to{' '}
                  <Text color={'primary.400'}>Term of use</Text>
                  <Text color={Colors.textColor}> {'\n & '} </Text>
                  <Text color={'primary.400'}>Privacy Policy</Text>
                </Text>
                <Button
                  mt={4}
                  mx={6}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  spinnerPlacement={'end'}
                  isLoadingText={'Login'}
                  _text={{fontWeight: '500', fontSize: 'md'}}>
                  Login
                </Button>

                <Text
                  fontWeight={'500'}
                  color={Colors.textColor}
                  fontSize={'md'}
                  px={3}
                  mt={8}
                  textAlign={'center'}>
                  Don't have an account?{' '}
                  <Text
                    color={'primary.400'}
                    onPress={() => navigation.navigate('Register')}>
                    Create One!
                  </Text>
                </Text>
              </KeyboardAwareScrollView>
            </Box>
          );
        }}
      </Formik>
      <Box position={'absolute'} bottom={12} left={0} right={0}>
        <Text
          fontWeight={'500'}
          color={Colors.textColor}
          fontSize={'md'}
          px={3}
          textAlign={'center'}>
          Or
        </Text>
        <Text
          fontWeight={'500'}
          color={Colors.textColor}
          fontSize={'md'}
          px={3}
          textAlign={'center'}>
          you can <Text color={'primary.400'}>Explore as Guest!</Text>
        </Text>
      </Box>
    </AuthLayout>
  );
};
