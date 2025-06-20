import React, {FC} from 'react';
import {Box, Button, Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import {Formik} from 'formik';

import {AuthStackScreenProps} from '../../../navigation/types';
import {AuthLayout} from '../../../components/layout/AuthLayout';
import {Colors} from '../../../utils/Colors';
import {FormInput} from '../../../components/common/FormInput';

type Props = AuthStackScreenProps<'ForgotPassword'>;

type ForgotPasswordFormValues = {
  email: string;
};

export const ForgotPasswordScreen: FC<Props> = ({navigation}) => {
  const initialValues: ForgotPasswordFormValues = {
    email: '',
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().required('Email is required'),
  });

  const onSubmit = () => {};

  return (
    <AuthLayout img={require('../../../assets/auth/OTP.png')}>
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
          //   handleSubmit,
          //    isSubmitting,
        }) => {
          return (
            <Box px={3}>
              <Text
                fontWeight={'600'}
                color={'primary.400'}
                fontSize={'xl'}
                mt={150}
                px={3}>
                Forgot Password ?
              </Text>
              <Text
                fontWeight={'600'}
                color={Colors.textColor}
                fontSize={'sm'}
                mb={3}
                px={3}>
                Enter your email for the verification process. we will send 6
                digit code to your email.
              </Text>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <Box px={5}>
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
                  <Button
                    onPress={() => navigation.navigate('OTP')}
                    mt={4}
                    mx={6}
                    _text={{fontWeight: '500', fontSize: 'md'}}>
                    Request OTP
                  </Button>
                </Box>
              </KeyboardAwareScrollView>
            </Box>
          );
        }}
      </Formik>
    </AuthLayout>
  );
};
