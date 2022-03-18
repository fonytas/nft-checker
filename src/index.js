import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import App from './App'
import { makeStore } from './store/make-store'
import RootHoc from './components/hoc/root-hoc'

// set redux store
const store = makeStore()

ReactDOM.render(
    <Provider store={store}>
        <RootHoc>
            <App />
        </RootHoc>
    </Provider>,
    document.getElementById('root'),
)
