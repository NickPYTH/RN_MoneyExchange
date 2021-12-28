import React from "react";
import { StyleSheet, View } from "react-native";
import { THEME } from "../themes";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Button } from "./UI/KeyboardButton";
import { addDigit, removeDigit, clearInput } from "../store/actions";

function KeyboardLayout({ addDigit, removeDigit, clearInput }) {
  return (
    <View style={styles.wrapper}>
      <Button text="9" action={addDigit} />
      <Button text="8" action={addDigit} />
      <Button text="7" action={addDigit} />
      <Button text="6" action={addDigit} />
      <Button text="5" action={addDigit} />
      <Button text="4" action={addDigit} />
      <Button text="3" action={addDigit} />
      <Button text="2" action={addDigit} />
      <Button text="1" action={addDigit} />
      <Button text="AC" action={clearInput} />
      <Button text="0" action={addDigit} />
      <Button text="<" action={removeDigit} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    backgroundColor: THEME.LIGHT_COLOR,
  },
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addDigit,
      removeDigit,
      clearInput,
    },
    dispatch
  );

const mapStateToProps = (state) => {
  const info = state.reducer;
  return { info };
};

export const Keyboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(KeyboardLayout);
