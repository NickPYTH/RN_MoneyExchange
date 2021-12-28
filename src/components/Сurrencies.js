import React, { useEffect, useState } from "react";
import { View, Picker, TouchableOpacity } from "react-native";
import { THEME } from "../themes";
import AppText from "./UI/AppText";
import { connect } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { bindActionCreators } from "redux";
import {
  fetchCourseByDate,
  fetchDailyCourses,
  setDate,
  setFromCurrency,
  setToCurrency,
} from "../store/actions";

const humanDate = (date) => {
  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const coefficientComputing = (from, to) => from.Value / to.Value;

const CurrenciesLayout = ({
  info,
  fetchDailyCourses,
  setFromCurrency,
  setToCurrency,
  setDate,
  fetchCourseByDate,
}) => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  useEffect(() => {
    fetchDailyCourses();
    setDate(new Date());
  }, []);
  if (info.currencies_list)
    return (
      <View style={{ height: 200 }}>
        <View style={{ flex: 1, flexDirection: "column" }}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Picker
              selectedValue={info.from_currency.CharCode}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setFromCurrency(itemValue)
              }
            >
              {info.currencies_list.map((currency) => {
                return (
                  <Picker.Item
                    key={currency.ID}
                    label={currency.CharCode}
                    value={currency.CharCode}
                  />
                );
              })}
            </Picker>
            <AppText
              value={info.inputValue.trim() ? info.inputValue.slice(0, 9) : 0}
              style={{ color: THEME.MAIN_COLOR, width: 150 }}
            />
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Picker
              selectedValue={info.to_currency.CharCode}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setToCurrency(itemValue)}
            >
              {info.currencies_list.map((currency) => {
                return (
                  <Picker.Item
                    key={currency.ID}
                    label={currency.CharCode}
                    value={currency.CharCode}
                  />
                );
              })}
            </Picker>
            <AppText
              value={(
                info.inputValue *
                coefficientComputing(info.from_currency, info.to_currency)
              )
                .toString()
                .slice(0, 9)}
              style={{ color: THEME.MAIN_COLOR, width: 150 }}
            />
          </View>
          {showDatePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={info.date}
              mode={"date"}
              is24Hour={true}
              display="default"
              onChange={(e) => {
                setDate(e.nativeEvent.timestamp);
                fetchCourseByDate(e.nativeEvent.timestamp);
                setShowDatePicker(false);
              }}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{ marginBottom: 20, height: 30 }}
          >
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <AppText
                style={{ color: THEME.MAIN_COLOR, fontSize: 14 }}
                value={"Курсы валют предоставлены ЦБР ".concat(
                  "(",
                  humanDate(info.date),
                  ")"
                )}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  else return <View />;
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      fetchDailyCourses,
      setFromCurrency,
      setToCurrency,
      setDate,
      fetchCourseByDate,
    },
    dispatch
  );

const mapStateToProps = (state) => {
  const info = state.reducer;
  return { info };
};

export const Currencies = connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrenciesLayout);
