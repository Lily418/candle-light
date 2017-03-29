import React from 'react'
import { Navigator } from 'react-native'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from '../modules'

import AddFeeling from './AddFeelingContainer'
import DescribeFeeling from './DescribeFeelingContainer'
import Diary from './DiaryContainer'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

const getRouteComponent = (route) => {
  switch(route.key) {
      case 'AddFeeling': return AddFeeling
      case 'DescribeFeeling': return DescribeFeeling
      case 'Diary': return Diary
  }
}

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator
          initialRoute={{key: 'AddFeeling'}}
          renderScene={(route, navigator) => {
            const RouteComponent = getRouteComponent(route)
            return(<RouteComponent navigator={navigator} route={route} />)
          }}
        />
      </Provider>
    )
  }
}
