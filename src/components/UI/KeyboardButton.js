import { StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import React from "react";
import { THEME } from "../../themes";

export const Button = ({ text, action }) => {
  return (
    <View style={styles.buttonWrapper}>
      <TouchableNativeFeedback
        onPress={() => {
          if (!isNaN(text)) action(text);
          else action();
        }}
        background={TouchableNativeFeedback.Ripple(THEME.MAIN_COLOR, true)}
      >
        <View style={styles.buttonFlex}>
          <Text style={styles.buttonFont}>{text}</Text>
        </View>
      </TouchableNativeFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonWrapper: {
    height: 90,
    width: 90,
    borderColor: THEME.MAIN_COLOR,
    borderWidth: 2,
    borderRadius: 100,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonFlex: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonFont: {
    fontSize: 24,
    color: THEME.MAIN_COLOR,
  },
});
