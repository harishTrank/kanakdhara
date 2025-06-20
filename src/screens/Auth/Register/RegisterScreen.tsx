import React, {FC} from 'react';
import {Box, Button, ScrollView, Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import {Formik} from 'formik';

import {AuthStackScreenProps} from '../../../navigation/types';
import {AuthLayout} from '../../../components/layout/AuthLayout';
import {Colors} from '../../../utils/Colors';
import {FormInput} from '../../../components/common/FormInput';
import {RegisterPayload} from '../../../store/auth/types';
import {register} from '../../../store/auth/authSlice';
import {useAppDispatch} from '../../../store';
import {useMessage} from '../../../hooks/useMessage';
import {showMessage} from 'react-native-flash-message';

type Props = AuthStackScreenProps<'Register'>;

export const RegisterScreen: FC<Props> = ({navigation}) => {
  const initialValues: RegisterPayload = {
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPass: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    mobile: Yup.string().required('Mobile number is required'),
    email: Yup.string().required('Email is required'),
    password: Yup.string().required('Password is required'),
    confirmPass: Yup.string().oneOf(
      [Yup.ref('password'), ''],
      'Passwords must match',
    ),
  });

  const dispatch = useAppDispatch();
  const setMessage = useMessage();

  const onSubmit = async ({
    firstName,
    lastName,
    email,
    mobile,
    password,
    confirmPass,
  }: RegisterPayload) => {
    try {
      await dispatch(
        register({firstName, lastName, email, mobile, password, confirmPass}),
      ).unwrap();
      showMessage({
        message: 'Registered SuccessFully !',
        type: 'success',
      });
    } catch (e: any) {
      setMessage(e.message);
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
            <ScrollView mt={150} px={3}>
              <Text
                fontWeight={'600'}
                color={'primary.400'}
                fontSize={'xl'}
                px={3}>
                Register / Sign Up
              </Text>
              <Text
                fontWeight={'600'}
                color={Colors.textColor}
                fontSize={'sm'}
                mb={3}
                px={3}>
                Your Information is safe with us
              </Text>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <Box px={5}>
                  <FormInput
                    isInvalid={touched.firstName && 'firstName' in errors}
                    onChangeText={handleChange('firstName')}
                    placeholder={'Enter First name'}
                    error={errors?.firstName}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    selectionColor={Colors.primary}
                    label={'First Name'}
                  />
                  <FormInput
                    isInvalid={touched.lastName && 'lastName' in errors}
                    onChangeText={handleChange('lastName')}
                    placeholder={'Enter Last Name'}
                    error={errors?.lastName}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    selectionColor={Colors.primary}
                    label={'Last Name'}
                  />
                  <FormInput
                    isInvalid={touched.mobile && 'mobile' in errors}
                    onChangeText={handleChange('mobile')}
                    placeholder={'Enter Mobile Number'}
                    error={errors?.mobile}
                    onBlur={handleBlur('mobile')}
                    value={values.mobile}
                    selectionColor={Colors.primary}
                    label={'Mobile Number'}
                    maxLength={10}
                    keyboardType={'number-pad'}
                  />
                  <FormInput
                    isInvalid={touched.email && 'email' in errors}
                    onChangeText={handleChange('email')}
                    placeholder={'Enter email'}
                    error={errors?.email}
                    onBlur={handleBlur('email')}
                    value={values.email}
                    selectionColor={Colors.primary}
                    label={'Email'}
                  />
                  <FormInput
                    isInvalid={touched.password && 'password' in errors}
                    onChangeText={handleChange('password')}
                    placeholder={'Enter Password'}
                    error={errors?.password}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    selectionColor={Colors.primary}
                    label={'Password'}
                    secureTextEntry={true}
                  />
                  <FormInput
                    isInvalid={touched.confirmPass && 'confirmPass' in errors}
                    onChangeText={handleChange('confirmPass')}
                    placeholder={'Enter confirm password'}
                    error={errors?.confirmPass}
                    onBlur={handleBlur('confirmPass')}
                    value={values.confirmPass}
                    selectionColor={Colors.primary}
                    label={'Confirm Password'}
                    secureTextEntry={true}
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
                  my={4}
                  mx={6}
                  onPress={handleSubmit}
                  isLoading={isSubmitting}
                  isDisabled={isSubmitting}
                  spinnerPlacement={'end'}
                  isLoadingText={'Register'}
                  _text={{fontWeight: '500', fontSize: 'md'}}>
                  Register
                </Button>
                <Text
                  mb={50}
                  fontWeight={'500'}
                  color={Colors.textColor}
                  fontSize={'md'}
                  px={3}
                  textAlign={'center'}>
                  Already have an account?{' '}
                  <Text
                    color={'primary.400'}
                    onPress={() => navigation.navigate('Login')}>
                    Login
                  </Text>
                </Text>
              </KeyboardAwareScrollView>
            </ScrollView>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};
