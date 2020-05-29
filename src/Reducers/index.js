import { combineReducers } from 'redux';
import { codes } from './codes'
import { groupCode } from './groupCode'
import { roomCode } from './roomCode'
import { name } from './name'

const rootReducer = combineReducers({
  codes,
  groupCode,
  roomCode,
  name
})

export default rootReducer
