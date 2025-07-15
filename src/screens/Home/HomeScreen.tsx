import React, {useEffect} from 'react';
import {Alert, Linking, ScrollView, View} from 'react-native';
import {HomeHeader} from './components/HomeHeader';
import {useGetAllCategories} from '../../hooks/useGetAllCategories';
import CircularCardList from './components/CircularCardList';
import SwiperFlatListView from './components/SwiperFlatListView';
import TextOneTwo from './components/TextOneTwo';
import DazzlingCollectionList from './components/DazzlingCollectionList';
import FourImageView from './components/FourImageView';
import TopSellingListComponent from './components/TopSellingListComponent';
import YellowButton from './components/YellowButton';
import ShowOffStyleBanners from './components/ShowOffStyleBanners';
import {Text, HStack, Image} from 'native-base';
import LookForPurityComponent from './components/LookForPurityComponent';
import BigBannerImage from './components/BigBannerImage';
import TrendingModernList from './components/TrendingModernList';
import {
  useAllProducts,
  useCustomerProducts,
  useDazzlingCollection,
  useOfferLayout,
} from '../../hooksQuery/Home/query';
import {TouchableOpacity} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}: any) => {
  const {categoryList} = useGetAllCategories();
  const offerBannerData: any = useOfferLayout();
  const dazzlingApi: any = useDazzlingCollection({
    query: {
      per_page: 15,
      page: 1,
      sort: 'default',
      category: 37,
    },
  });

  const topSellingList: any = useAllProducts({
    query: {
      per_page: 5,
      page: 1,
      sort: 'default',
    },
  });

  const trendingDataList: any = useCustomerProducts({
    query: {
      per_page: 5,
      page: 1,
      sort: 'default',
      featured: 'yes',
    },
  });

const handlePress = async (appUrl: string, webUrl: string) => {
  const canOpenApp = await Linking.canOpenURL(appUrl);
  try {
    if (canOpenApp) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    Alert.alert('Error', 'Could not open the link.');
    console.error('Failed to open link:', error);
  }
};

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
      showsVerticalScrollIndicator={false}>
      <View>
        <HomeHeader />
        <CircularCardList navigation={navigation} categoryList={categoryList} />
        <SwiperFlatListView banner={offerBannerData?.data?.banner} />

        <View
          style={{
            paddingBottom: 10,
          }}>
          <TextOneTwo
            text1={'Discover Our Dazzling Collection'}
            text2={'Explore our vast assortment of fine jewelry'}
          />
        </View>
        <DazzlingCollectionList DazzlingList={dazzlingApi?.data?.data} />

        <TextOneTwo
          text1={'Affordable Allure on Budget'}
          text2={'Discover Captivating Jewelry at Budget-Friendly Prices'}
        />

        <FourImageView />

        <TextOneTwo
          text1={'Top-Selling Treasures'}
          text2={'Introducing the Jewels that Take the Lead'}
        />

        <TopSellingListComponent
          TopSellingList={topSellingList?.data?.data}
          navigation={navigation}
        />

        <YellowButton
          title={'View all'}
          onPress={() => navigation.navigate('ProductPage')}
        />

        <View
          style={{
            marginTop: 30,
          }}>
          <BigBannerImage
            image={require('../../assets/homeBanner/banner1.png')}
          />
          <BigBannerImage
            image={require('../../assets/homeBanner/banner2.png')}
          />
          <BigBannerImage
            image={require('../../assets/homeBanner/banner3.png')}
          />
        </View>

        <TextOneTwo
          text1={'Trending Modern Minimalism'}
          text2={'Stay Fashion-Forward with the Latest'}
        />

        <TrendingModernList
          navigation={navigation}
          TrendingList={trendingDataList?.data?.data}
        />

        <YellowButton
          title={'View all'}
          onPress={() => navigation.navigate('ProductPage')}
        />

        <TextOneTwo
          text1={'Look for Purity'}
          text2={'Embrace Your Unique Expression'}
        />

        <LookForPurityComponent navigation={navigation} />

        {/* <TextOneTwo
          text1={'Shop by Metal'}
          text2={'Explore an exquisite collection of jewelry'}
        />

        <ShopByMetelList navigation={navigation} /> */}

        <SwiperFlatListView
          banner={offerBannerData?.data?.banner?.filter(
            (item: any) => item?.name?.toLowerCase() === 'coupon',
          )}
        />

        <TextOneTwo
          text1={'Show off Your Style'}
          text2={'Love from the customer Side'}
        />

        <ShowOffStyleBanners />

        <View>
          <Text
            mt={5}
            fontWeight={'600'}
            color={'primary.400'}
            fontSize={'lg'}
            textAlign={'center'}>
            #durgajewellers
          </Text>
          <Text
            mt={1}
            mb={5}
            fontWeight={'500'}
            color={'black'}
            fontSize={'xs'}
            textAlign={'center'}>
            {
              'Use the hashtag in your Instagram photos\nfor a chance to be featured on our page!'
            }
          </Text>
          <HStack
            mb={115}
            alignItems={'center'}
            alignSelf={'center'}
            justifyContent={'space-between'}
            w={'48%'}
            px={5}
            py={3}>
            <TouchableOpacity onPress={() => handlePress('instagram://user?username=durgajewellerssonipat',"https://www.instagram.com/durgajewellerssonipat/")}>
              <Image
                source={require('../../assets/social/instagram.png')}
                alt={'no img'}
                w={8}
                h={8}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("fb://page/durgajewellerssnp","https://www.facebook.com/durgajewellerssnp/")}>
            <Image
              source={require('../../assets/social/facebook.png')}
              alt={'no img'}
              w={8}
              h={8}
            />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handlePress("https://durga-jewellers.co.in/", "https://durga-jewellers.co.in/")}>
            <Image
              source={require('../../assets/social/twitter.png')}
              alt={'no img'}
              w={8}
              h={8}
            />
            </TouchableOpacity>
          </HStack>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
