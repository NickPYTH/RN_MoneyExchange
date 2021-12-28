import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { THEME } from "../../themes";

export default function AppText(props) {
  return (
    <Text style={{ ...styles.wrapper, ...props.style }}>{props.value}</Text>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    color: THEME.LIGHT_COLOR,
    fontSize: 24,
  },
});
