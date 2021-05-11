import { loadingBarReducer } from 'react-redux-loading-bar'
import {combineReducers} from 'redux'

import {authReducer} from './Auth'
import {modalReducer} from './Modal'

const rootReducer = combineReducers({
  loadingBar: loadingBarReducer,
  auth: authReducer,
  modal: modalReducer,
})

export default rootReducer