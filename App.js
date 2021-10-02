import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './src/components/Header'
import { Сurrencies } from "./src/components/Сurrencies";
import {Keyboard} from './src/components/Keyboard';
import {createStore} from "redux";
import {Provider} from "react-redux";
import Reducer from "./src/store/reducers"

export default function App() {
    const store = createStore(Reducer);
  return (
      <Provider store={store}>
        <View style={styles.container}>
          <Header/>
          <Сurrencies />
          <Keyboard />
        </View>
      </Provider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
});
