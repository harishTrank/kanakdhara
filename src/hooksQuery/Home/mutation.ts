import { useMutation } from "@tanstack/react-query";
import { addTocartApi, customSearch, getSingleProduct, paymentGetWayKeys, updateAddress, updateToCart } from "../../QueryStore/Services/Home";


export const useAddTocart = () => {
  return useMutation((payload) => addTocartApi(payload))
}

export const usecustomSearch = () => {
  return useMutation((payload) => customSearch(payload))
}

export const useGetSingleProduct = () => {
  return useMutation((payload) => getSingleProduct(payload))
}

export const useUpdateToCart = () => {
  return useMutation((payload) => updateToCart(payload))
}

export const useUpdateAddress = () => {
  return useMutation((payload) => updateAddress(payload))
}

export const usePaymentGetWayKeys = () => {
  return useMutation((payload) => paymentGetWayKeys(payload))
}
