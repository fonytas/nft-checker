import { combineReducers, applyMiddleware, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all } from 'redux-saga/effects'
import { loadReducers, loadSagaTasks } from '@makejack4/redux-saga-toolkit'
import createReduxWaitForMiddleware from 'redux-wait-for-action'

import * as modules from '../modules'

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

export const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware()

    const reducers = {
        ...loadReducers(modules),
    }
    const rootReducer = combineReducers(reducers)
    const store = createStore(rootReducer, bindMiddleware([sagaMiddleware, createReduxWaitForMiddleware()]))

    const tasks = loadSagaTasks(modules)
    function* rootSaga() {
        yield all([...tasks])
    }
    sagaMiddleware.run(rootSaga)
    return store
}
