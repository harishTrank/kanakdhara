import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from "react-native";
import { ScreenHeader } from '../../components/common/ScreenHeader';
import {
  Text,
} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Colors} from '../../utils/Colors';
import { SortModal } from './components/SortModal';
import { CategoryModel } from './components/CategoryModel';
import { PriceRangeModal } from './components/PriceRangeModel';

export const ProductPageScreen = ({navigation, route}: any) => {
  const [sort, setSort] = useState(false);
  const [sortValue, setSortValue]: any = useState('default');
  const [categoryValue, setCategoryValue]: any = useState(undefined);

  return (
    <View>
      <SortModal
        setSortValue={setSortValue}
        sort={sort}
        onCloseSort={setSort}
        sortValue={sortValue}
      />
      {/* <CategoryModel
        category={category}
        onCloseCategory={() => setCategory(false)}
        categoryValue={categoryValue}
        selectedCategory={setCategoryValue}
        categoryList={categoryList}
      />
      <PriceRangeModal setPriceRange={setPriceRange} onClosePrice={setPrice} price={price} /> */}
      <ScreenHeader heading={'Products'} />
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnHandler}>
            <Text fontWeight={'600'} fontSize={'sm'} color={Colors.textColor}>
              Sort{' '}
            </Text>
            <AntDesign name="caretdown" size={15} color={Colors.textColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHandler}>
            <Text fontWeight={'600'} fontSize={'sm'} color={'#9C9C9C'}>
              Category{' '}
            </Text>
            <AntDesign name="caretdown" size={15} color={Colors.textColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnHandler}>
            <Text fontWeight={'600'} fontSize={'sm'} color={Colors.textColor}>
              Price Range{' '}
            </Text>
            <AntDesign name="caretdown" size={15} color={Colors.textColor} />
          </TouchableOpacity>
        </View>
    </View>
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection:'row',
    alignItems:'center',
    justifyContent: "space-between",
    marginHorizontal: 15
  },
  btnHandler: {
    flexDirection:"row",
    alignItems:'center',
  }
})