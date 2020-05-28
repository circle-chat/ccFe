import { combineReducers } from 'redux';
import { codes } from './codes'
import { groupCode } from './groupCode'

const rootReducer = combineReducers({
  codes,
  groupCode
})

export default rootReducer
