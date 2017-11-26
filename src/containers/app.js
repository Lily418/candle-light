import React from 'react'
import { Platform } from "react-native"

import { createStore, applyMiddleware, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'
import thunk from 'redux-thunk'
import * as reducers from '../modules'

import { StackNavigator, TabNavigator } from 'react-navigation';

import People from './PeopleContainer'
import DescribeFeeling from './DescribeFeelingContainer'
import Diary from './DiaryContainer'
import DetailFeeling from './DetailFeelingContainer'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers(reducers)
const store = createStoreWithMiddleware(reducer)

const MainTabs = TabNavigator({
  People: {
    screen: People,
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
  headerMode: Platform.OS === 'ios' ? "float" : "none",
  navigationOptions: {
    headerBackTitle: "Back",
    headerStyle: {
      backgroundColor: "#FFF"
    }
  }
});

const MainStackContainer = connect((state) => { return {
  'showingFeeling' : state.feelings.showingFeeling
}}, (dispatch) => {

})(MainStack)

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainStack />
      </Provider>
    )
  }
}
