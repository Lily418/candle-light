import React from 'react'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from '../modules'

import { StackNavigator, TabNavigator } from 'react-navigation';

import AddFeeling from './AddFeelingContainer'
import DescribeFeeling from './DescribeFeelingContainer'
import Diary from './DiaryContainer'
import DetailFeeling from './DetailFeelingContainer'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

const MainTabs = TabNavigator({
  Add: {
    screen: AddFeeling,
  },
  Diary: {
    screen: Diary
  }
}, {
  tabBarPosition: 'bottom',
  tabBarOptions: {
    activeTintColor: '#1a8299',
    inactiveTintColor: 'black',
    showIcon: true,
    style: {
      backgroundColor: 'white'
    },
    indicatorStyle: {
      backgroundColor: 'white'
    }
  },
})

const MainStack = StackNavigator({
  Home: { screen: MainTabs },
  DescribeFeeling: { screen : DescribeFeeling },
  DetailFeeling: { screen: DetailFeeling }
  
}, {
  headerMode: "none"
});


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainStack />
      </Provider>
    )
  }
}
