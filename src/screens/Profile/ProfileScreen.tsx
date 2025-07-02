import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Image, Pressable, Text} from 'native-base';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {ActivityIndicator, Platform} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';

import {DrawerStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../components/common/ScreenHeader';
import {Colors} from '../../utils/Colors';
import {FormInput} from '../../components/common/FormInput';
import {getUserProfile, updateProfile} from '../../store/user/userSlice';
import {useAppDispatch} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {ProfilePayload} from '../../store/user/type';
import moment from 'moment';

type Props = DrawerStackScreenProps<'Profile'>;

type ProfileFormValues = {
  firstName: string;
  lastName: string;
};

export const ProfileScreen: FC<Props> = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [joinedAs, setJoinedAs] = useState('');
  const [userImage, setUserImage] = useState({
    name: '',
    type: '',
    uri: '',
  });

  const dispatch = useAppDispatch();
  const setMessage = useMessage();

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        const userData = await dispatch(getUserProfile()).unwrap();
        if (userData) {
          setFirstName(userData.firstName);
          setLastName(userData.lastName);
          setEmail(userData.email);
          setJoinedAs(userData.joined);
          setUserImage({
            name: 'picture',
            uri: userData.picture,
            type: '',
          });
        }
        setLoading(false);
      } catch (e: any) {
        setMessage(e.message);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const initialValues: ProfileFormValues = {
    firstName: firstName,
    lastName: lastname,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
  });

  const onSubmit = async ({firstName, lastName, userImage}: ProfilePayload) => {
    try {
      await dispatch(updateProfile({firstName, lastName, userImage})).unwrap();
      showMessage({
        message: 'Profile Updated SuccessFully !',
        type: 'success',
      });
    } catch (e: any) {
      setMessage(e.message);
    }
  };

  const choosePhotoFromLibrary = async () => {
    check(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
    )
      .then(result => {
        switch (result) {
          case RESULTS.GRANTED:
            _openImagePicker();
            break;
          case RESULTS.UNAVAILABLE:
            setMessage('This feature is not available on this device!');
            break;
          case RESULTS.DENIED:
            request(
              Platform.OS === 'ios'
                ? PERMISSIONS.IOS.PHOTO_LIBRARY
                : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE,
            ).then(requestResult => {
              if (requestResult === RESULTS.GRANTED) {
                _openImagePicker();
              }
            });
            break;
          case RESULTS.LIMITED:
            _openImagePicker();
            break;
          case RESULTS.BLOCKED:
            setMessage(
              'The permission is denied! Please enable storage permission.',
            );
            openSettings().catch(settingsErr =>
              setMessage('Unable to open settings!'),
            );
            break;
        }
      })
      .catch(e => {
        setMessage(e.message);
      });
  };

  const _openImagePicker = async () => {
    const result = await launchImageLibrary({
      includeBase64: true,
      mediaType: 'photo',
      selectionLimit: 1,
      quality: 0.5,
    });

    if ('assets' in result) {
      const [file] = result?.assets as Asset[];
      if (file) {
        setUserImage({
          uri: file?.uri,
          name: file?.name,
          type: file?.type,
        });
      }
    }
  };

  return (
    <Box flex={1} bg={'#fff'}>
      <ScreenHeader heading={'Profile'} />
      {loading ? (
        <Box
          flex={1}
          backgroundColor={Colors.white}
          alignItems={'center'}
          justifyContent={'center'}>
          <ActivityIndicator size={'large'} color={Colors.primary} />
        </Box>
      ) : (
        <>
          <Box
            mt={3}
            borderWidth={1}
            borderColor={'primary.400'}
            borderRadius={100}
            w={120}
            h={120}
            alignSelf={'center'}
            justifyContent={'center'}
            alignItems={'center'}>
            <Image
              source={{uri: userImage.uri}}
              w={110}
              h={110}
              alt={'no img'}
              borderRadius={100}
              resizeMode={'contain'}
            />
            <Pressable
              onPress={choosePhotoFromLibrary}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                backgroundColor: Colors.primary,
                padding: 5,
                borderRadius: 100,
              }}>
              <Ionicons name={'camera'} size={24} color={'white'} />
            </Pressable>
          </Box>
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
            }) => {
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
                      label={'First Name'}
                    />
                    <FormInput
                      isInvalid={touched.lastName && 'lastName' in errors}
                      onChangeText={handleChange('lastName')}
                      placeholder={'Enter your last name'}
                      error={errors?.lastName}
                      onBlur={handleBlur('lastName')}
                      value={values.lastName}
                      selectionColor={Colors.primary}
                      label={'Last Name'}
                    />
                    <FormInput
                      onChangeText={handleChange('email')}
                      placeholder={'Enter email'}
                      onBlur={handleBlur('email')}
                      value={email}
                      selectionColor={Colors.primary}
                      label={'Email'}
                      editable={false}
                    />
                    <Text fontWeight={'600'} fontSize={'xs'} color={'black'}>
                      Joined
                      <Text color={'primary.400'}>
                        {' '}
                        {moment(joinedAs).format('DD MMM YYYY')}
                      </Text>
                    </Text>
                    <Button
                      my={5}
                      isLoading={isSubmitting}
                      isLoadingText={'Update'}
                      isDisabled={isSubmitting}
                      onPress={handleSubmit}
                      spinnerPlacement={'end'}
                      mx={6}
                      w={'60%'}
                      alignSelf={'center'}
                      _text={{fontWeight: '500', fontSize: 'md'}}>
                      Update
                    </Button>
                  </KeyboardAwareScrollView>
                </Box>
              );
            }}
          </Formik>
        </>
      )}
    </Box>
  );
};
