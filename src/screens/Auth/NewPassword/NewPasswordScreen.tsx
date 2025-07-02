import React, {FC} from 'react';
import {Box, Button, Text} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import {Formik} from 'formik';

import {AuthStackScreenProps} from '../../../navigation/types';
import {AuthLayout} from '../../../components/layout/AuthLayout';
import {Colors} from '../../../utils/Colors';
import {FormInput} from '../../../components/common/FormInput';

type Props = AuthStackScreenProps<'NewPassword'>;

type NewPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export const NewPasswordScreen: FC<Props> = ({navigation}) => {
  const initialValues: NewPasswordFormValues = {
    password: '',
    confirmPassword: '',
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
                mb={5}
                px={3}>
                Reset Password
              </Text>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <Box px={5}>
                  <FormInput
                    isInvalid={touched.password && 'password' in errors}
                    onChangeText={handleChange('password')}
                    placeholder={'Enter Password'}
                    error={errors?.password}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    selectionColor={Colors.primary}
                    label={'Password'}
                  />
                  <FormInput
                    isInvalid={
                      touched.confirmPassword && 'confirmPassword' in errors
                    }
                    onChangeText={handleChange('confirmPassword')}
                    placeholder={'Enter confirm password'}
                    error={errors?.confirmPassword}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    selectionColor={Colors.primary}
                    label={'Confirm Password'}
                  />
                  <Button
                    onPress={() => navigation.navigate('Login')}
                    my={4}
                    mx={6}
                    _text={{fontWeight: '500', fontSize: 'md'}}>
                    Reset Password
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
