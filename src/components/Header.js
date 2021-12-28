import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../themes";
import AppText from "./UI/AppText";
import { StatusBar } from "expo-status-bar";

export default function Header() {
  return (
    <View style={{ height: 70 }}>
      <View style={styles.wrapper}>
        <AppText style={{ fontSize: 16 }} value="Конвертер валют" />
        <StatusBar style="auto" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: THEME.MAIN_COLOR,
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 10,
  },
});
