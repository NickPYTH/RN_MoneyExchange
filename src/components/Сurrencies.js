import React, {useState} from 'react';
import { StyleSheet, View, Picker } from 'react-native';
import {THEME} from "../themes";
import AppText from "./UI/AppText";
import { connect } from "react-redux";

const Home = props => {
    const [selectedValue, setSelectedValue] = useState("RUB");
    return (
        <View>
            <View style={{marginTop: 40, marginBottom: 10}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: 100, color: THEME.MAIN_COLOR, fontSize: 36 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="RUB" value="RUB" />
                        <Picker.Item label="USD" value="USD" />
                    </Picker>
                    <AppText style={{color: THEME.MAIN_COLOR, fontSize: 28, width: 190}} value={props.data.value} />
                </View>
            </View>
            <View style={{marginTop: 40, marginBottom: 60}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <Picker
                        selectedValue={selectedValue}
                        style={{ height: 50, width: 100, color: THEME.MAIN_COLOR, fontSize: 36 }}
                        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                        <Picker.Item label="EUR" value="EUR" />
                        <Picker.Item label="RUB" value="RUB" />
                        <Picker.Item label="USD" value="USD" />
                    </Picker>
                    <AppText style={{color: THEME.MAIN_COLOR, fontSize: 28, width: 190, overflowX: 'hidden'}} value={(props.data.coefficient*props.data.value).toFixed(2)} />
                </View>
            </View>
            <View style={{marginBottom: 20}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                    <AppText style={{color: THEME.MAIN_COLOR, fontSize: 14}} value={'Курсы валют предоставлены ЦБР '.concat("(",props.data.date,")")} />
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = (state) => {
    const { data } = state;
    return { data };
};

export const Сurrencies = connect(mapStateToProps, null)(Home);

const styles = StyleSheet.create({
});
