import {useMutation} from '@tanstack/react-query';
import {
  addTocartApi,
  customSearch,
  getSingleProduct,
  paymentGetWayKeys,
  removeItemFromCart,
  updateAddress,
  updateToCart,
} from '../../QueryStore/Services/Home';

export const useAddTocart = () =>
  useMutation({
    mutationFn: payload => addTocartApi(payload),
  });

export const usecustomSearch = () =>
  useMutation({
    mutationFn: payload => customSearch(payload),
  });

export const useGetSingleProduct = () =>
  useMutation({
    mutationFn: payload => getSingleProduct(payload),
  });

export const useUpdateToCart = () =>
  useMutation({
    mutationFn: payload => updateToCart(payload),
  });
export const useRemoveItemFromCart = () =>
  useMutation({
    mutationFn: payload => removeItemFromCart(payload),
  });

export const useUpdateAddress = () =>
  useMutation({
    mutationFn: payload => updateAddress(payload),
  });

export const usePaymentGetWayKeys = () =>
  useMutation({
    mutationFn: payload => paymentGetWayKeys(payload),
  });
