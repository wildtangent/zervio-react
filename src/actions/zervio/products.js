import { CALL_API, Schemas } from '../../middleware/zervio-api';

export const PRODUCTS_REQUEST = 'PRODUCTS_REQUEST'
export const PRODUCTS_SUCCESS = 'PRODUCTS_SUCCESS'
export const PRODUCTS_FAILURE = 'PRODUCTS_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/zerv-api.js.
const fetchProducts = () => ({
  [CALL_API]: {
    types: [ PRODUCTS_REQUEST, PRODUCTS_SUCCESS, PRODUCTS_FAILURE ],
    endpoint: `products.json`,
    schema: Schemas.PRODUCT_ARRAY
  }
})

// Fetches a single user from Zerv.io API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadProducts = (requiredFields = []) => (dispatch, getState) => {
  const products = getState().zervio.entities.products;

  if (Object.entries(products).length > 0 && requiredFields.every(key => products.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchProducts())
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})
