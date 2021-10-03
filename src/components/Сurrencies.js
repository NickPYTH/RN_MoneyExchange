import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Picker, Platform, TouchableOpacity, Text} from 'react-native';
import {THEME} from "../themes";
import AppText from "./UI/AppText";
import { connect } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import {bindActionCreators} from "redux";
import {changeDate, loadCurrencies, putCoefficient} from "../store/actions";

const Home = props => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [selectedValue1, setSelectedValue1] = useState("RUB");
    const [selectedValue2, setSelectedValue2] = useState("USD");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const firstChangeHandler = (value) => {
        let formattedDate = getHumanDate(date)
        formattedDate = formattedDate.replace(".", "/");
        formattedDate = formattedDate.replace(".", "/");
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`https://currate.ru/api/?get=rates&pairs=${value+selectedValue2}&key=833ca67cd4a5b4da166fa6bca7730082&date=2021-09-01T15:00:00`, requestOptions)
            .then(response => response.text())
            .then(
                (result) => {
                    let resultJSON = JSON.parse(result);
                    console.log(result)
                    props.putCoefficient(resultJSON.data[value+selectedValue2])
                },
                (error) => {

                }
            )
            .catch(error => console.log('error', error));
    }
    const secondChangeHandler = (value) => {
        let formattedDate = getHumanDate(date)
        formattedDate = formattedDate.replace(".", "/");
        formattedDate = formattedDate.replace(".", "/");
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`https://currate.ru/api/?get=rates&pairs=${selectedValue1+value}&key=833ca67cd4a5b4da166fa6bca7730082&date=2021-09-01T15:00:00`, requestOptions)
            .then(response => response.text())
            .then(
                (result) => {
                    let resultJSON = JSON.parse(result);
                    console.log(result)
                    props.putCoefficient(resultJSON.data[selectedValue1+value])
                },
                (error) => {

                }
            )
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        let formattedDate = getHumanDate(date)
        formattedDate = formattedDate.replace(".", "/");
        formattedDate = formattedDate.replace(".", "/");
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        fetch(`https://currate.ru/api/?get=currency_list&key=833ca67cd4a5b4da166fa6bca7730082`, requestOptions)
            .then(response => response.text())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setCurrencies(result);
                    props.loadCurrencies(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
            .catch(error => console.log('error', error));
    }, [])

    useEffect(() => {

    })

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
        props.changeDate(date);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const getHumanDate = (a) => {
        let day = a.getDate().toString();
        let month = a.getMonth().toString();
        let year = a.getFullYear().toString();
        if (day.length === 1)
            day = '0'+day;
        if (month.length === 1)
            month = '0'+month;
        return day+'.'+month+'.'+year;
    }


    if (error) {
        return <Text>Ошибка: {error.message}</Text>;
    } else if (!props.data.isLoad) {
        return <Text>Загрузка...</Text>;
    } else {

        return (
            <View>
                <View style={{marginTop: 40, marginBottom: 10}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Text>{props.data.coefficient}</Text>
                        <Picker
                            selectedValue={selectedValue1}
                            style={{height: 50, width: 100, color: THEME.MAIN_COLOR, fontSize: 36}}
                            onValueChange={(itemValue, itemIndex) => {
                                firstChangeHandler(itemValue);
                                setSelectedValue1(itemValue);
                            }}
                        >
                            {
                                props.data.currencies.map((currency)=> <Picker.Item label={currency} value={currency}/>)
                            }

                            <Picker.Item label="RUB" value="RUB"/>
                            <Picker.Item label="USD" value="USD"/>
                        </Picker>
                        <AppText style={{color: THEME.MAIN_COLOR, fontSize: 28, width: 190}} value={props.data.value}/>
                    </View>
                </View>
                <View style={{marginTop: 40, marginBottom: 60}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <Picker
                            selectedValue={selectedValue2}
                            style={{height: 50, width: 100, color: THEME.MAIN_COLOR, fontSize: 36}}
                            onValueChange={(itemValue, itemIndex) => {
                                secondChangeHandler(itemValue);
                                setSelectedValue2(itemValue);
                            }}
                        >
                            {
                                props.data.currencies.map((currency)=> <Picker.Item label={currency} value={currency}/>)
                            }
                        </Picker>
                        <AppText style={{color: THEME.MAIN_COLOR, fontSize: 28, width: 190, overflowX: 'hidden'}}
                                 value={(props.data.coefficient * props.data.value).toFixed(2)}/>
                    </View>
                </View>
                <TouchableOpacity onPress={showDatepicker} style={{marginBottom: 20, height: 30}}>
                    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center'}}>
                        <AppText style={{color: THEME.MAIN_COLOR, fontSize: 14}}
                                 value={'Курсы валют предоставлены ЦБР '.concat("(", getHumanDate(date), ")")}/>
                    </View>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour={true}
                        display="default"
                        onChange={onChange}
                    />
                )}
            </View>
        );
    }
}

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            changeDate,
            loadCurrencies,
            putCoefficient
        },
        dispatch
    );

const mapStateToProps = (state) => {
    const { data } = state;
    return { data };
};

export const Сurrencies = connect(mapStateToProps, mapDispatchToProps)(Home);

const styles = StyleSheet.create({
});
