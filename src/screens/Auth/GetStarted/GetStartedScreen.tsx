import React, {FC, useRef, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Box, Image, Pressable, Text} from 'native-base';
import {SafeAreaView} from 'react-native-safe-area-context';
import AppIntroSlider from 'react-native-app-intro-slider';

import {AuthStackScreenProps} from '../../../navigation/types';
import {Colors} from '../../../utils/Colors';
import {SliderData, SliderDataItem} from '../../../data/AppIntroSlider';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type Props = AuthStackScreenProps<'GetStarted'>;

export const GetStartedScreen: FC<Props> = ({navigation}) => {
  const slider = useRef<AppIntroSlider<SliderDataItem> | null>(null);

  const renderItem = ({item, index}: {item: SliderDataItem; index: number}) => {
    return (
      <Box
        key={item.id}
        alignItems={'center'}
        mt={index === 0 ? 0 : index === 1 ? 4 : index === 2 ? 2 : 0}>
        <Image
          alt={'banner'}
          source={item.image}
          w={'100%'}
          resizeMode={'contain'}
        />
        <Text
          mt={index === 0 ? 4 : index === 1 ? 0 : index === 2 ? 2 : 0}
          fontWeight={'600'}
          color={Colors.lightBlack}
          fontSize={'lg'}>
          {item.title}
        </Text>
        <Text
          mb={2}
          mt={1}
          fontWeight={'500'}
          color={Colors.textColor}
          fontSize={'md'}
          textAlign={'center'}>
          {item.text}
        </Text>
      </Box>
    );
  };

  const renderPagination = (activeIndex: number) => {
    return (
      <Box position={'absolute'} bottom={35} w={'85%'} alignSelf={'center'}>
        {activeIndex === 2 ? (
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text
              fontWeight={'600'}
              color={'primary.400'}
              fontSize={'md'}
              textAlign={'center'}>
              Get Started
            </Text>
          </Pressable>
        ) : (
          <>
            <Box
              flexDirection={'row'}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <Pressable mr={3} onPress={() => navigation.navigate('Login')}>
                <Text
                  fontWeight={'600'}
                  color={Colors.textColor}
                  fontSize={'md'}
                  textAlign={'center'}>
                  Skip
                </Text>
              </Pressable>
              <Box flexDirection={'row'}>
                {SliderData.length > 1 &&
                  SliderData.map((_, i) => (
                    <Box
                      key={i}
                      borderWidth={1}
                      borderRadius={100}
                      p={1}
                      borderColor={i === activeIndex ? 'primary.400' : 'white'}>
                      <Box
                        key={i}
                        width={2}
                        height={2}
                        borderRadius={100}
                        backgroundColor={
                          i === activeIndex ? 'primary.400' : Colors.grey
                        }
                      />
                    </Box>
                  ))}
              </Box>
              <Pressable
                mr={3}
                onPress={() =>
                  slider?.current?.goToSlide(activeIndex + 1, true)
                }>
                <Text
                  fontWeight={'600'}
                  color={'primary.400'}
                  fontSize={'md'}
                  textAlign={'center'}>
                  Next
                </Text>
              </Pressable>
            </Box>
          </>
        )}
      </Box>
    );
  };


  const firstTimeAppOpen = async () => {
    await AsyncStorage.setItem("firstTime", "TRUE");
  }

  useEffect(() => {
    firstTimeAppOpen();
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <AppIntroSlider
        ref={ref => (slider.current = ref)}
        data={SliderData}
        renderItem={renderItem}
        dotClickEnabled={false}
        renderPagination={renderPagination}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
