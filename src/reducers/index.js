import { combineReducers } from 'redux'

import github from './github';
import zervio from './zervio';

const rootReducer = combineReducers({
  github,
  zervio
})

export default rootReducer
