import {Box, Image} from 'native-base';
import SwiperFlatList from 'react-native-swiper-flatlist';
import {Dimensions} from 'react-native';
import {Colors} from '../../../utils/Colors';

const {width}: any = Dimensions.get('window');

const SwiperFlatListView = ({banner}: any) => {
  return (
    <Box h={270} mt={3}>
      <SwiperFlatList
        autoplay={true}
        autoplayLoop={true}
        keyExtractor={(item: any) => `${item.id + Math.random()}`}
        index={0}
        showPagination
        paginationDefaultColor={'#D9D9D9'}
        paginationActiveColor={Colors.primary}
        paginationStyle={{
          paddingTop: 20,
        }}
        paginationStyleItemActive={{
          width: 8,
          height: 8,
          borderRadius: 16,
        }}
        paginationStyleItemInactive={{
          width: 8,
          height: 8,
          borderRadius: 16,
        }}
        data={banner}
        renderItem={({item}: any) => (
          <Image
            source={{uri: item?.banner_url}}
            alt={'no img'}
            w={width}
            h={250}
            resizeMode={'cover'}
          />
        )}
      />
    </Box>
  );
};

export default SwiperFlatListView;
