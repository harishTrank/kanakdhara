import {callApi} from '../../../utils/api/apiUtils';
import {userEndPoints} from '../../Endpoints/Home';

export const offerLayout = () =>
  callApi({
    uriEndPoint: userEndPoints.offerLayout.v1,
  });

export const dazzlingCollection = ({query}: any) =>
  callApi({
    uriEndPoint: userEndPoints.dazzlingCollection.v1,
    query,
  });

export const allProducts = ({query}: any) =>
  callApi({
    uriEndPoint: userEndPoints.allProducts.v1,
    query,
  });

export const customerProducts = ({query}: any) =>
  callApi({
    uriEndPoint: userEndPoints.customerProducts.v1,
    query,
  });

export const addTocartApi = ({body}: any) =>
  callApi({
    uriEndPoint: userEndPoints.addToCart.v1,
    body,
  });

export const removeToCartApi = ({query}: any) =>
  callApi({
    uriEndPoint: userEndPoints.removeToCart.v1,
    query,
  });

export const customSearch = ({body}: any) =>
  callApi({
    uriEndPoint: userEndPoints.customSearch.v1,
    body,
  });

export const getSingleProduct = ({body}: any) =>
  callApi({
    uriEndPoint: userEndPoints.getSingleProduct.v1,
    body,
  });

export const categoeryProduct = ({query}: any) =>
  callApi({
    uriEndPoint: userEndPoints.categoeryProduct.v1,
    query,
  });

export const cartListApi = ({query}: any) =>
  callApi({
    uriEndPoint: userEndPoints.cartListApi.v1,
    query,
  });

export const updateToCart = ({query}: any) =>
  callApi({
    uriEndPoint: userEndPoints.updateToCart.v1,
    query,
  });

export const updateAddress = ({body}: any) =>
  callApi({
    uriEndPoint: userEndPoints.updateAddress.v1,
    body,
  });

export const myprofileApi = ({body}: any) =>
  callApi({
    uriEndPoint: userEndPoints.myprofileApi.v1,
    body,
    multipart: true,
  });

export const paymentGetWayKeys = ({query}: any) =>
  callApi({
    uriEndPoint: userEndPoints.paymentGetWayKeys.v1,
    query,
  });

export const getAllCategories = () =>
  callApi({
    uriEndPoint: userEndPoints.allCategories.v1,
  });

export const logoutApiManage = ({query}: any) =>
  callApi({
    uriEndPoint: userEndPoints.logoutApiManage.v1,
    query,
  });

export const orderListApi = ({body}: any) =>
  callApi({
    uriEndPoint: userEndPoints.orderListApi.v1,
    body,
  });
