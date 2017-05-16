import React from 'react'
import { Navigator, BackAndroid } from 'react-native'
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


  constructor(props) {
  super(props)
  this.navigator = null;
  }

  handleBack() {
    if (this.navigator && this.navigator.getCurrentRoutes().length > 1){
      this.navigator.pop();
      return true; //avoid closing the app
    } 

    return false; //close the app
  }
  
  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.handleBack.bind(this));
  }

  componentWillUnmount() {
    BackAndroid.removeEventListener('hardwareBackPress', this.handleBack);
  }

  render() {
    return (
      <Provider store={store}>
        <Navigator
          ref={navigator => {this.navigator = navigator}}
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
