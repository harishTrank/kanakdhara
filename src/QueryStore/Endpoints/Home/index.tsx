import {defaults} from '../default';

export const userEndPoints = {
  offerLayout: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: 'layout',
    },
  },

  myprofileApi: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: 'myprofile',
    },
  },

  dazzlingCollection: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: 'custom-products',
    },
  },

  allProducts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: 'custom-products',
    },
  },
  customerProducts: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: 'custom-products',
    },
  },
  addToCart: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: 'cart/add',
    },
  },
  removeToCart: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: 'cart/remove',
    },
  },
  updateToCart: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: 'cart/update',
    },
  },

  updateAddress: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: 'checkout/update-billing',
    },
  },

  customSearch: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: 'custom-search',
    },
  },

  getSingleProduct: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: 'get-products-by-id',
    },
  },

  categoeryProduct: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: 'custom-products',
    },
  },

  cartListApi: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: 'cart',
    },
  },

  paymentGetWayKeys: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: 'checkout/new-order',
    },
  },
  allCategories: {
    v1: {
      ...defaults.methods.GET,
      ...defaults.versions.v1,
      uri: 'products/all-categories',
    },
  },

  logoutApiManage: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: 'logout',
    },
  },

  orderListApi: {
    v1: {
      ...defaults.methods.POST,
      ...defaults.versions.v1,
      uri: 'checkout/orderlist',
    },
  },
};
