import {createStore, applyMiddleware, compose} from 'redux'
import createSagaMiddleware from 'redux-saga'
import { createLogger } from 'redux-logger'
import rootReducer from 'reducers'
import rootSaga from 'sagas'
import { loadingBarMiddleware as createLoadingBarMiddleware } from 'react-redux-loading-bar'

const initialState = {}

const sagaMiddleware = createSagaMiddleware()
const loggerMiddleware = createLogger()
const loadingBarMiddleware = createLoadingBarMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const middleware = [
  sagaMiddleware,
  loggerMiddleware,
  loadingBarMiddleware
]

const store = createStore(
  rootReducer,
  initialState,
  composeEnhancers(
    applyMiddleware(...middleware)
  )
)

sagaMiddleware.run(rootSaga)

export default store