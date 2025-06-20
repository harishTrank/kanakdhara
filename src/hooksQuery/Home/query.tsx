import {useQuery} from '@tanstack/react-query';
import {
  offerLayout,
  dazzlingCollection,
  allProducts,
  customerProducts,
  categoeryProduct,
  cartListApi,
  removeToCartApi,
} from '../../QueryStore/Services/Home';

export const useOfferLayout = () => useQuery(['useOfferLayout'], offerLayout);

export const useDazzlingCollection = (payload: any) =>
  useQuery(['dazzlingCollection'], () => dazzlingCollection(payload));

export const useAllProducts = (payload: any) =>
  useQuery(['allProducts'], () => allProducts(payload));

export const useCustomerProducts = (payload: any) =>
  useQuery(['customerProducts'], () => customerProducts(payload));

export const useCategoeryProduct = (payload: any) =>
  useQuery(['categoeryProduct'], () => categoeryProduct(payload));

export const useCartListApi = (payload: any) =>
  useQuery(['cartListApi'], () => cartListApi(payload));

export const useRemoveToCartApi = (payload: any) =>
  useQuery(['removeToCartApi'], () => removeToCartApi(payload));