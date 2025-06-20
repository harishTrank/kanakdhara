import React, {FC} from 'react';
import {Box, Button} from 'native-base';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import * as Yup from 'yup';

import {ScreenHeader} from '../../components/common/ScreenHeader';
import {RootStackScreenProps} from '../../navigation/types';
import {Colors} from '../../utils/Colors';
import {FormInput} from '../../components/common/FormInput';

type Props = RootStackScreenProps<'updatePassword'>;

type LoginFormValues = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export const UpdatePasswordScreen: FC<Props> = () => {
  const initialValues: LoginFormValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    newPassword: Yup.string().required('New Password is required'),
    confirmPassword: Yup.string().required('Confirm Password is required'),
  });

  const onSubmit = () => {};

  return (
    <Box flex={1} bg={'#fff'}>
      <ScreenHeader heading={'Update Password'} />
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
            <Box>
              <KeyboardAwareScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">
                <Box mt={3} px={5}>
                  <FormInput
                    isInvalid={
                      touched.currentPassword && 'currentPassword' in errors
                    }
                    onChangeText={handleChange('currentPassword')}
                    placeholder={'Enter Current Password'}
                    error={errors?.currentPassword}
                    onBlur={handleBlur('currentPassword')}
                    value={values.currentPassword}
                    selectionColor={Colors.primary}
                    label={'Current Password'}
                  />
                  <FormInput
                    isInvalid={touched.newPassword && 'newPassword' in errors}
                    onChangeText={handleChange('newPassword')}
                    placeholder={'Enter New Password'}
                    error={errors?.newPassword}
                    onBlur={handleBlur('newPassword')}
                    value={values.newPassword}
                    selectionColor={Colors.primary}
                    label={'New Password'}
                  />
                  <FormInput
                    isInvalid={
                      touched.confirmPassword && 'confirmPassword' in errors
                    }
                    onChangeText={handleChange('confirmPassword')}
                    placeholder={'Enter Confirm Password'}
                    error={errors?.confirmPassword}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                    selectionColor={Colors.primary}
                    label={'Confirm Password'}
                  />
                </Box>
                <Button
                  mt={4}
                  mx={6}
                  _text={{fontWeight: '500', fontSize: 'md'}}>
                  Update
                </Button>
              </KeyboardAwareScrollView>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};
