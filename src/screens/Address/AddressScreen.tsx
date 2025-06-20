import React, {FC, useState, useEffect} from 'react';
import {Box, Button, Text} from 'native-base';
import {ScrollView} from 'react-native';
import {DrawerStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../components/common/ScreenHeader';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FormInput} from '../../components/common/FormInput';
import {Colors} from '../../utils/Colors';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useUpdateAddress} from '../../hooksQuery/Home/mutation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {store} from '../../store';
import {Axios} from '../../lib/Axios';
import FullScreenLoader from '../../components/FullScreenLoader';

type Props = DrawerStackScreenProps<'Address'>;

type ProfileFormValues = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNo: string;
};

export const AddressScreen: FC<Props> = ({route}: any) => {
  const [loading, setLoading]: any = useState(false);
  const navigation: any = useNavigation();
  const [initialValues, setInitialValues]: any = useState({
    firstName: route?.params?.paymentAddress?.first_name,
    lastName: route?.params?.paymentAddress?.last_name,
    address1: route?.params?.paymentAddress?.address_1,
    address2: route?.params?.paymentAddress?.address_2,
    city: route?.params?.paymentAddress?.city,
    state: route?.params?.paymentAddress?.state,
    zipCode: route?.params?.paymentAddress?.postcode,
    phoneNo: route?.params?.paymentAddress?.phone,
  });
  const getCurrentAddressHandler = async () => {
    setLoading(true);
    try {
      const {userId} = store.getState().auth;
      const formData = new FormData();
      formData.append('user_id', userId);
      const result = await Axios.post('myprofile', formData, {
        headers: {
          Accept: 'application/json',
          'content-type': 'multipart/form-data',
        },
      });
      if (result.data.status === '1') {
        const billing = result?.data?.data?.billing;
        setInitialValues({
          firstName: billing?.first_name,
          lastName: billing?.last_name,
          address1: billing?.address_1,
          address2: billing?.address_2,
          city: billing?.city,
          state: billing?.state,
          zipCode: billing?.postcode,
          phoneNo: billing?.phone,
        });
      }
      setLoading(false);
    } catch (error) {
      console.log('errorerror', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      getCurrentAddressHandler();
    });
  }, [navigation]);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    address1: Yup.string().required('Address is required'),
    city: Yup.string().required('City is required'),
    state: Yup.string().required('State is required'),
    zipCode: Yup.string().required('ZipCode is required'),
    phoneNo: Yup.string().required('Phone No is required'),
  });

  const [pinCodeStatus, setPinCodeStatus]: any = useState(false);
  const checkZipCodeServiceHandler = async (text: any) => {
    try {
      const response = await axios.post(
        'https://test.sequel247.com/api/checkServiceability',
        {
          token: '18eb319e3d90c05ab195ddce9efb2064',
          pin_code: text?.nativeEvent?.text,
        },
      );
      if (response?.data?.status === 'true') {
        showMessage({
          type: 'success',
          message: response?.data?.message,
        });
        setPinCodeStatus(false);
      } else {
        setPinCodeStatus(true);
        showMessage({
          type: 'danger',
          message: response?.data?.errorInfo?.pin_code
            ? response?.data?.errorInfo?.pin_code
            : response?.data?.message,
        });
      }
      console.log('responseresponse', response?.data?.errorInfo);
    } catch (err) {
      console.log('errerr', err);
    }
  };

  const updateAddressApi: any = useUpdateAddress();
  const onSubmit = async (value: any) => {
    if (pinCodeStatus) {
      showMessage({
        type: 'danger',
        message: 'Please fix zip code',
      });
    } else {
      const userId: any = await AsyncStorage.getItem('accessToken');
      updateAddressApi
        ?.mutateAsync({
          body: {
            user_id: JSON.parse(userId)?.userId,
            billing: {
              address_1: value.address1,
              address_2: value.address2,
              city: value.city,
              state: value.state,
              postcode: value.zipCode,
              phone: value.phoneNo,
              first_name: value.firstName,
              last_name: value.lastName,
            },
          },
        })
        .then(() => {
          showMessage({
            message: 'Address updated successfully.',
            type: 'success',
          });
          navigation.goBack();
        })
        .catch((err: any) => console.log('err', err));
    }
  };

  return (
    <Box flex={1} bg={'#fff'}>
      <ScreenHeader heading={'Address'} />
      <FullScreenLoader loading={loading} />
      <Text fontWeight={'600'} fontSize={'md'} color={Colors.textColor} p={3}>
        Your Delivery Address!
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Formik
          validateOnBlur={true}
          enableReinitialize={true}
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
              <Box px={5}>
                <KeyboardAwareScrollView
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled">
                  <FormInput
                    isInvalid={touched.firstName && 'firstName' in errors}
                    onChangeText={handleChange('firstName')}
                    placeholder={'Enter your first name'}
                    error={errors?.firstName}
                    onBlur={handleBlur('firstName')}
                    value={values.firstName}
                    selectionColor={Colors.primary}
                    label={'First name'}
                  />
                  <FormInput
                    isInvalid={touched.lastName && 'lastName' in errors}
                    onChangeText={handleChange('lastName')}
                    placeholder={'Enter your last name'}
                    error={errors?.lastName}
                    onBlur={handleBlur('lastName')}
                    value={values.lastName}
                    selectionColor={Colors.primary}
                    label={'Last name'}
                  />
                  <FormInput
                    isInvalid={touched.address1 && 'address1' in errors}
                    onChangeText={handleChange('address1')}
                    placeholder={'Enter your Address'}
                    error={errors?.address1}
                    onBlur={handleBlur('address1')}
                    value={values.address1}
                    selectionColor={Colors.primary}
                    label={'Address 1'}
                  />
                  <FormInput
                    isInvalid={touched.address2 && 'address2' in errors}
                    onChangeText={handleChange('address2')}
                    placeholder={'Enter your Address'}
                    error={errors?.address2}
                    onBlur={handleBlur('address2')}
                    value={values.address2}
                    selectionColor={Colors.primary}
                    label={'Address 2'}
                  />
                  <FormInput
                    isInvalid={touched.city && 'city' in errors}
                    onChangeText={handleChange('city')}
                    placeholder={'Enter City'}
                    error={errors?.city}
                    onBlur={handleBlur('city')}
                    value={values.city}
                    selectionColor={Colors.primary}
                    label={'City'}
                  />
                  <FormInput
                    isInvalid={touched.state && 'state' in errors}
                    onChangeText={handleChange('state')}
                    placeholder={'Enter State'}
                    error={errors?.state}
                    onBlur={handleBlur('state')}
                    value={values.state}
                    selectionColor={Colors.primary}
                    label={'State'}
                  />
                  <FormInput
                    isInvalid={touched.zipCode && 'zipCode' in errors}
                    onChangeText={handleChange('zipCode')}
                    placeholder={'Enter Zip Code'}
                    error={errors?.zipCode}
                    onBlur={(text: any) => {
                      handleBlur('zipCode');
                      checkZipCodeServiceHandler(text);
                    }}
                    value={values.zipCode}
                    selectionColor={Colors.primary}
                    label={'Zip Code'}
                  />
                  <FormInput
                    isInvalid={touched.phoneNo && 'phoneNo' in errors}
                    onChangeText={handleChange('phoneNo')}
                    placeholder={'Enter Phone Number'}
                    error={errors?.phoneNo}
                    onBlur={handleBlur('phoneNo')}
                    value={values.phoneNo}
                    selectionColor={Colors.primary}
                    label={'Phone Number'}
                    keyboardType={'number-pad'}
                    maxLength={10}
                  />
                  <Button
                    my={5}
                    mx={6}
                    w={'60%'}
                    alignSelf={'center'}
                    isLoading={isSubmitting}
                    isDisabled={isSubmitting}
                    onPress={handleSubmit}
                    _text={{fontWeight: '500', fontSize: 'md'}}>
                    Update Address
                  </Button>
                </KeyboardAwareScrollView>
              </Box>
            );
          }}
        </Formik>
      </ScrollView>
    </Box>
  );
};
