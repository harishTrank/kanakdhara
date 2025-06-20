import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {useMessage} from './useMessage';
import {Axios} from '../lib/Axios';

export type categoryDTO = {
  id: number;
  name: string;
  image: string;
  count: number;
};

export const useGetAllCategories = () => {
  const navigation = useNavigation();
  const setMessage = useMessage();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [categoryList, setCategoryList] = useState<categoryDTO[]>([]);

  const getGetCategoryList = () => {
    Axios.get('products/all-categories')
      .then((response: any) => {
        if (response.data.status === 1) {
          const a = response.data.data;
          const index = a.findIndex(m => m.name === 'Uncategorized');
          if (index > -1) {
            a.splice(index, 1);
          }
          setCategoryList(a);
          setIsLoading(false);
        }
      })
      .catch((error: any) => {
        setMessage(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getGetCategoryList();
    });

    return unsubscribe;
  }, [navigation]);

  return {
    categoryList,
    isLoading,
  };
};
