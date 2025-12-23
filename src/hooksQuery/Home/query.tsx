import {useQuery} from '@tanstack/react-query';
import {
  offerLayout,
  dazzlingCollection,
  allProducts,
  customerProducts,
  categoeryProduct,
  cartListApi,
  removeToCartApi,
  getCustomPriceApi,
  getSilverCustomPriceApi,
} from '../../QueryStore/Services/Home';

export const useOfferLayout = () =>
  useQuery({
    queryKey: ['useOfferLayout'],
    queryFn: offerLayout,
  });

export const useDazzlingCollection = (payload: any) =>
  useQuery({
    queryKey: ['dazzlingCollection', payload],
    queryFn: () => dazzlingCollection(payload),
    enabled: !!payload,
  });

export const useAllProducts = (payload: any) =>
  useQuery({
    queryKey: ['allProducts', payload],
    queryFn: () => allProducts(payload),
    enabled: !!payload,
  });

export const useCustomerProducts = (payload: any) =>
  useQuery({
    queryKey: ['customerProducts', payload],
    queryFn: () => customerProducts(payload),
    enabled: !!payload,
  });

export const useCategoeryProduct = (payload: any) =>
  useQuery({
    queryKey: ['categoeryProduct', payload],
    queryFn: () => categoeryProduct(payload),
    enabled: !!payload,
  });

export const useCartListApi = (payload: any) =>
  useQuery({
    queryKey: ['cartListApi', payload],
    queryFn: () => cartListApi(payload),
    enabled: !!payload,
  });

export const useRemoveToCartApi = (payload: any) =>
  useQuery({
    queryKey: ['removeToCartApi', payload],
    queryFn: () => removeToCartApi(payload),
    enabled: !!payload,
  });

export const useGetCustomPriceApi = () =>
  useQuery({
    queryKey: ['getCustomPriceApi'],
    queryFn: getCustomPriceApi,
  });

export const useGetSilverCustomPriceApi = () =>
  useQuery({
    queryKey: ['getSilverCustomPriceApi'],
    queryFn: getSilverCustomPriceApi,
  });
