import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import githubApi from '../middleware/github-api'
import zervioApi from '../middleware/zervio-api'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, githubApi, zervioApi)
)

export default configureStore
