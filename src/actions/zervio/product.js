import { CALL_API, Schemas } from '../../middleware/zervio-api';

export const PRODUCT_REQUEST = 'PRODUCT_REQUEST'
export const PRODUCT_SUCCESS = 'PRODUCT_SUCCESS'
export const PRODUCT_FAILURE = 'PRODUCT_FAILURE'

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/zerv-api.js.
const fetchProduct = id => ({
  [CALL_API]: {
    types: [ PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAILURE ],
    endpoint: `products/${id}.json`,
    schema: Schemas.PRODUCT
  }
})

// Fetches a single user from Zerv.io API unless it is cached.
// Relies on Redux Thunk middleware.
export const loadProduct = (id, requiredFields = []) => (dispatch, getState) => {
  const product = getState().zervio.entities.products[id]
  if (product && requiredFields.every(key => product.hasOwnProperty(key))) {
    return null
  }

  return dispatch(fetchProduct(id))
}

export const RESET_ERROR_MESSAGE = 'RESET_ERROR_MESSAGE'

// Resets the currently visible error message.
export const resetErrorMessage = () => ({
    type: RESET_ERROR_MESSAGE
})
