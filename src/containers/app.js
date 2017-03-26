import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from '../modules'

import AddFeeling from '../components/AddFeeling'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AddFeeling />
      </Provider>
    )
  }
}
