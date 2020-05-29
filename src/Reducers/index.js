import { combineReducers } from 'redux';
import { codes } from './codes'
import { groupCode } from './groupCode'
import { roomCode } from './roomCode'

const rootReducer = combineReducers({
  codes,
  groupCode,
  roomCode
})

export default rootReducer
