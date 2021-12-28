import React from "react";
import { StyleSheet, View } from "react-native";
import Header from "./src/components/Header";
import { Currencies } from "./src/components/Сurrencies";
import { Keyboard } from "./src/components/Keyboard";
import { Provider } from "react-redux";
import { store } from "./src/store/reducersMerge";

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <Header />
        <Currencies />
        <Keyboard />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
