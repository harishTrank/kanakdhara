import React, {FC, useEffect, useState} from 'react';
import {Dimensions} from 'react-native';
import {ActivityIndicator} from 'react-native';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {SafeAreaView} from 'react-native-safe-area-context';

import {RootStackScreenProps} from '../../navigation/types';
import {usecustomSearch} from '../../hooksQuery/Home/mutation';
import {TopSellingRenderItem} from '../Home/components/TopSellingListComponent';
import {HomeHeader} from '../Home/components/HomeHeader';

type Props = RootStackScreenProps<'Search'>;

const trendingSearches = [
  'Fast Delivery',
  'New',
  'Gold Chain',
  'Gold Coins',
  'Baby Jewellery',
];

export const SearchScreen: FC<Props> = ({navigation}) => {
  const customSearchApi: any = usecustomSearch();

  const screenWidth = Dimensions.get('window').width;

  const CARD_WIDTH = (screenWidth - 48) / 3;

  const [searchText, setSearchText] = useState('');
  const [collectionList, setCollectionList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getSearchResultDataHandler = async () => {
    try {
      setLoading(true);

      const res = await customSearchApi.mutateAsync({
        body: {
          search: searchText,
          per_page: 10,
        },
      });

      setCollectionList(res?.products?.data || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSearchResultDataHandler();
  }, [searchText]);

  const renderTrendingItem = (item: string, index: number) => {
    return (
      <TouchableOpacity key={index} style={styles.trendingItem}>
        <Text style={styles.trendingText}>{item}</Text>

        <FontAwesome5
          name="fire"
          size={13}
          color="#FF6B00"
          style={{marginLeft: 6}}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      {/* <View style={styles.topBanner}>
        <Text style={styles.topBannerText}>
          10g of 24k gold price ₹61,525 +478
        </Text>
      </View> */}

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>

        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={18} color="#9CA3AF" />

          <TextInput
            placeholder="Search jewellery..."
            placeholderTextColor="#9CA3AF"
            value={searchText}
            onChangeText={setSearchText}
            style={styles.input}
          />
        </View>
      </View>

      {searchText.trim() === '' ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="search" size={70} color="#D1D5DB" />

          <Text style={styles.emptyTitle}>Search Your Favourite Jewellery</Text>

          <Text style={styles.emptySubTitle}>
            Find rings, necklaces, earrings and more
          </Text>
        </View>
      ) : loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#D4AF37" />

          <Text style={styles.loadingText}>Searching Products...</Text>
        </View>
      ) : collectionList.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="cube-outline" size={70} color="#D1D5DB" />

          <Text style={styles.emptyTitle}>No Products Found</Text>

          <Text style={styles.emptySubTitle}>
            Try searching with another keyword
          </Text>
        </View>
      ) : (
        <FlatList
          data={collectionList}
          renderItem={({item}: any) =>
            TopSellingRenderItem(item, navigation, CARD_WIDTH)
          }
          keyExtractor={(item: any, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.productListContainer}
          numColumns={3}
          columnWrapperStyle={styles.columnWrapper}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  topBanner: {
    backgroundColor: '#000',
    paddingVertical: 8,
    alignItems: 'center',
  },

  topBannerText: {
    color: '#D4AF37',
    fontSize: 12,
    fontWeight: '600',
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    marginHorizontal: 14,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 48,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 15,
    color: '#111827',
  },

  scrollContainer: {
    paddingBottom: 40,
  },

  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },

  clearText: {
    color: '#D4AF37',
    fontWeight: '600',
    fontSize: 13,
  },

  tagsWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: 16,
    marginBottom: 28,
  },

  tag: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginRight: 10,
    marginBottom: 10,
  },

  tagText: {
    color: '#111827',
    fontWeight: '500',
    fontSize: 14,
  },

  trendingWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    marginTop: 16,
  },

  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#ECECEC',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 12,
  },

  trendingText: {
    color: '#111827',
    fontSize: 14,
    fontWeight: '500',
  },

  collectionHeader: {
    paddingHorizontal: 20,
    marginTop: 20,
  },

  subHeading: {
    marginTop: 5,
    color: '#6B7280',
    fontSize: 14,
  },

  flatlistContainer: {
    paddingLeft: 20,
    paddingTop: 22,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
    marginTop: 120,
  },

  emptyTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111827',
    marginTop: 18,
  },

  emptySubTitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 22,
  },

  productListContainer: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  loaderContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 120,
  },

  loadingText: {
    marginTop: 14,
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
});
