import React, {FC, useEffect, useState} from 'react';
import {Box, Button, Image, Pressable, Text} from 'native-base';
import {Formik} from 'formik';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import * as Yup from 'yup';
import Toast from 'react-native-toast-message';
import {
  check,
  openSettings,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {
  ActivityIndicator,
  Alert,
  Modal,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Asset, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {showMessage} from 'react-native-flash-message';

import {DrawerStackScreenProps} from '../../navigation/types';
import {ScreenHeader} from '../../components/common/ScreenHeader';
import {Colors} from '../../utils/Colors';
import {FormInput} from '../../components/common/FormInput';
import {getUserProfile, updateProfile} from '../../store/user/userSlice';
import {store, useAppDispatch} from '../../store';
import {useMessage} from '../../hooks/useMessage';
import {ProfilePayload} from '../../store/user/type';
import moment from 'moment';
import {deleteAccountApi} from '../../QueryStore/Services/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions} from '@react-navigation/native';

type Props = DrawerStackScreenProps<'Profile'>;

type ProfileFormValues = {
  firstName: string;
  lastName: string;
};

export const ProfileScreen: FC<Props> = ({navigation}: any) => {
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [joinedAs, setJoinedAs] = useState('');
  const [userImage, setUserImage]: any = useState({
    name: '',
    type: '',
    uri: '',
  });

  const dispatch = useAppDispatch();
  const setMessage = useMessage();
  const [deleteModalOpen, setDeleteModalOpen]: any = useState(false);
  const [modalPasswordOpen, setModalPasswordOpen]: any = useState(false);
  const [password, setPassword]: any = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      setLoading(true);
      try {
        const userData: any = await dispatch(getUserProfile()).unwrap();
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
      const [file]: any = result?.assets as Asset[];
      if (file) {
        setUserImage({
          uri: file?.uri,
          name: file?.name,
          type: file?.type,
        });
      }
    }
  };

  const handleDeleteAccount = async () => {
    const {userId} = await store.getState().auth;

    deleteAccountApi({
      body: {
        user_id: userId,
        password: password,
      },
    })
      .then((res: any) => {
        console.log('account deleted', res);
        Toast.show({
          type: 'success',
          text1: res?.message,
        });
        setDeleteModalOpen(false);
        setModalPasswordOpen(false);
        AsyncStorage.clear();
        navigation.navigate('AuthStack', {
          screen: 'Login',
        });
      })
      .catch((err: any) => {
        console.log('error', JSON.stringify(err));
        Toast.show({
          type: 'error',
          text1: 'Wrong Password entered',
        });
        setDeleteModalOpen(false);
        setModalPasswordOpen(false);
      });
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
                    <TouchableOpacity onPress={() => setDeleteModalOpen(true)}>
                      <Text
                        fontWeight={'600'}
                        fontSize={'xs'}
                        color={'red.600'}
                        textAlign={'right'}>
                        Delete Account
                      </Text>
                    </TouchableOpacity>
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={deleteModalOpen}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setDeleteModalOpen(!deleteModalOpen);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.confirmdeleteText}>
                  Do you really want to delete account!
                </Text>
                {!modalPasswordOpen && (
                  <View style={styles.modalButtonView}>
                    <TouchableOpacity
                      style={{
                        ...styles.modalButton,
                        backgroundColor: 'red',
                      }}
                      onPress={() => setModalPasswordOpen(true)}>
                      <Text style={styles.btnText}>Yes, Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={styles.modalButton}
                      onPress={() => setDeleteModalOpen(false)}>
                      <Text style={styles.btnText}>cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}
                {modalPasswordOpen && (
                  <View>
                    <View style={styles.passwordInputView}>
                      <TextInput
                        placeholder="Enter your account password"
                        placeholderTextColor="#000"
                        secureTextEntry={true}
                        style={styles.passwordInput}
                        onChangeText={setPassword}
                        maxLength={10}
                      />
                    </View>
                    <View style={styles.modalButtonView}>
                      <TouchableOpacity
                        style={{
                          ...styles.modalButton,
                          backgroundColor: 'red',
                        }}
                        onPress={handleDeleteAccount}>
                        <Text style={styles.btnText}>Confirm</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.modalButton}
                        onPress={() => {
                          setDeleteModalOpen(false);
                          setModalPasswordOpen(false);
                        }}>
                        <Text style={styles.btnText}>cancel</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </Modal>
        </>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  deleteAccountText: {
    color: 'red',
    fontSize: 15,
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  confirmdeleteText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 20,
  },
  modalButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 14,
  },
  passwordInputView: {
    color: '#000',
    fontSize: 14,
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#000',
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  passwordInput: {
    paddingVertical: 5,
    fontSize: 16,
  },
});
