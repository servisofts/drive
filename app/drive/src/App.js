import React, { Component } from 'react';
import { View, Text, SafeAreaView, StatusBar } from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Reducer from './Reducer';
import SSNavigation from './SSNavigation';
import AppParams from './Params';
import { SComponentClass } from './SComponent';
import BarraDeDesconeccion from './SSSocket/BarraDeDesconeccion';
import * as SSSocket from './SSSocket'

const store = createStore(
  Reducer,
  {},
  applyMiddleware(reduxThunk),
);
SSSocket.init(store);

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{
        width: '100%',
        flex: 1,
        maxHeight: "100%"
      }} behavior={{ padding: 0, }}>
        <StatusBar barStyle={'light-content'} backgroundColor={"#000"} />
        <BarraDeDesconeccion socketName={AppParams.socket.name} color={"#000000"} visible={false} />
        <SComponentClass >
          <SSNavigation />
        </SComponentClass>
      </SafeAreaView>
    </Provider>
  );
}
export default App;