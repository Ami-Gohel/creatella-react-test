/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  FlatList,
  TouchableHighlight,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducers from './src/components/redux/reducers'
import rootSaga from './src/components/redux/saga'
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducers,
  applyMiddleware(sagaMiddleware)
)
if (process.env.NODE_ENV !== 'test') {
  sagaMiddleware.run(rootSaga);
}

import  ProductScreen  from './src/components/ProductScreen/ProductScreen';
var { height, width } = Dimensions.get('window');

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <ProductScreen />
      </Provider>
    );
  }
};

