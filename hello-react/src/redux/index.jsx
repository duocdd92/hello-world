import React from 'react'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import todoApp from './reducers/index.jsx'
import App from './components/index.jsx'

let store = createStore(todoApp)

const ReduxApp = () => (
    <Provider store={store}>
        <App />
    </Provider>
)

export default ReduxApp