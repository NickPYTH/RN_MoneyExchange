import React, {useEffect, useState} from 'react';
import { StyleSheet, View, Picker, Platform, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import {THEME} from "../themes";
import AppText from "./UI/AppText";
import { connect } from "react-redux";
import DateTimePicker from "@react-native-community/datetimepicker";
import { bindActionCreators } from "redux";
import { changeDate, loadCurrencies, putCoefficient } from "../store/actions";
import { Http } from '../http';

const Home = props => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [currencies, setCurrencies] = useState([]);
    const [selectedValue1, setSelectedValue1] = useState("RUB");
    const [selectedValue2, setSelectedValue2] = useState("USD");
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    useEffect(() => {
        Http.getDailyCourse().then(
                (result) => {
                    setIsLoaded(true);
                    setCurrencies(Object.keys(result.Valute));
                    props.loadCurrencies(Object.keys(result.Valute));
                    props.putCoefficient(1/result.Valute.USD.Value)
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                });
    }, [])
    const firstChangeHandler = (value) => {
        Http.getCourseByDate(date).then(
                (result) => {
                    if (result.error === undefined){
                        setSelectedValue1(value);
                        if (selectedValue2 === value)
                            props.putCoefficient(1);
                        else if (value === "RUB")
                            props.putCoefficient(1/result.Valute[selectedValue2].Value);
                        else if (selectedValue2 === "RUB")
                            props.putCoefficient(result.Valute[value].Value);
                        else
                            props.putCoefficient(result.Valute[value].Value / result.Valute[selectedValue2].Value );
                    }
                    else{
                        setShow(Platform.OS === 'ios');
                        let tmp = new Date();
                        if (tmp.getFullYear() === date.getFullYear() && tmp.getMonth() === date.getMonth() && tmp.getDate() === date.getDate()){}else ToastAndroid.show(result.explanation, ToastAndroid.LONG);
                        setSelectedValue1(value);
                        setDate(new Date());
                        Http.getDailyCourse().then(
                                (result) => {
                                    if (selectedValue2 === value)
                                        props.putCoefficient(1);
                                    else if (value === "RUB")
                                        props.putCoefficient(1/result.Valute[selectedValue2].Value);
                                    else if (selectedValue2 === "RUB")
                                        props.putCoefficient(result.Valute[value].Value);
                                    else
                                        props.putCoefficient(result.Valute[value].Value / result.Valute[selectedValue2].Value);
                                },
                                (error) => {
                                    setIsLoaded(true);
                                    setError(error);
                                }
                            )
                            .catch(error => console.log('error', error));
                    }
                },
                (error) => {
                    setSelectedValue1(value);
                    setDate(new Date());
                    Http.getDailyCourse().then(
                            (result) => {
                                if (selectedValue2 === value)
                                    props.putCoefficient(1);
                                else if (value === "RUB")
                                    props.putCoefficient(result.Valute[selectedValue2].Value);
                                else if (selectedValue2 === "RUB")
                                    props.putCoefficient(result.Valute[value].Value);
                                else
                                    props.putCoefficient(result.Valute[selectedValue2].Value / result.Valute[value].Value);
                            },
                            (error) => {
                                setIsLoaded(true);
                                setError(error);
                            }
                        )
                        .catch(error => console.log('error', error));
                }
            )
            .catch(error => console.log('error', error));
    }
    const secondChangeHandler = (value) => {
        Http.getCourseByDate(date).then(
                (result) => {
                    if (result.error === undefined){
                        setSelectedValue2(value);
                        if (selectedValue1 === value)
                            props.putCoefficient(1);
                        else if (selectedValue1 === "RUB")
                            props.putCoefficient(1/result.Valute[value].Value);
                        else if (value === "RUB")
                            props.putCoefficient(result.Valute[selectedValue1].Value);
                        else
                            props.putCoefficient(result.Valute[selectedValue1].Value / result.Valute[value].Value);
                    }
                    else{
                        setShow(Platform.OS === 'ios');
                        let tmp = new Date();
                        if (tmp.getFullYear() === date.getFullYear() && tmp.getMonth() === date.getMonth() && tmp.getDate() === date.getDate()){}else ToastAndroid.show(result.explanation, ToastAndroid.LONG);
                        setSelectedValue2(value);
                        setDate(new Date());
                        Http.getDailyCourse().then(
                                (result) => {
                                    if (selectedValue1 === value)
                                        props.putCoefficient(1);
                                    else if (selectedValue1 === "RUB")
                                        props.putCoefficient(1/result.Valute[value].Value);
                                    else if (value === "RUB")
                                        props.putCoefficient(result.Valute[selectedValue1].Value);
                                    else
                                        props.putCoefficient(result.Valute[selectedValue1].Value / result.Valute[value].Value);
                                },
                                (error) => {
                                    setIsLoaded(true);
                                    setError(error);
                                }
                            )
                            .catch(error => console.log('error', error));
                    }
                },
                (error) => {
                    setSelectedValue2(value);
                    setDate(new Date());
                    Http.getDailyCourse().then(
                            (result) => {
                                if (selectedValue1 === value)
                                    props.putCoefficient(1);
                                else if (value === "RUB")
                                    props.putCoefficient(result.Valute[selectedValue1].Value);
                                else if (selectedValue1 === "RUB")
                                    props.putCoefficient(result.Valute[value].Value);
                                else
                                    props.putCoefficient(result.Valute[selectedValue1].Value / result.Valute[value].Value);
                            },
                            (error) => {
                                setIsLoaded(true);
                                setError(error);
                            }
                        )
                        .catch(error => console.log('error', error));
                }
            )
            .catch(error => console.log('error', error));
    }
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
         Http.getCourseByDate(currentDate).then(
                (result) => {
                    if (result.error === undefined){
                        setShow(Platform.OS === 'ios');
                        setDate(currentDate);
                        props.changeDate(currentDate);
                        if (selectedValue1 === selectedValue2)
                            props.putCoefficient(1);
                        else if (selectedValue1 === "RUB")
                            props.putCoefficient(1/result.Valute[selectedValue2].Value);
                    }
                    else{
                        setShow(Platform.OS === 'ios');
                        let tmp = new Date();
                        if (tmp.getFullYear() === currentDate.getFullYear() && tmp.getMonth() === currentDate.getMonth() && tmp.getDate() === currentDate.getDate()){}else ToastAndroid.show(result.explanation, ToastAndroid.LONG);
                        setSelectedValue2(selectedValue2);
                        setDate(tmp);
                        Http.getDailyCourse().then(
                                (result) => {
                                    if (selectedValue1 === selectedValue2)
                                        props.putCoefficient(1);
                                    else if (selectedValue2 === "RUB")
                                        props.putCoefficient(result.Valute[selectedValue1].Value);
                                    else if (selectedValue1 === "RUB")
                                        props.putCoefficient(result.Valute[selectedValue2].Value);
                                    else
                                        props.putCoefficient(result.Valute[selectedValue1].Value / result.Valute[selectedValue2].Value);
                                },
                                (error) => {
                                    setIsLoaded(true);
                                    setError(error);
                                }
                            )
                            .catch(error => console.log('error', error));
                    }
                },
                (error) => {
                    console.log('failed ', error);
                    ToastAndroid.show(error, ToastAndroid.LONG);
                });
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
        let month = (Number(a.getMonth())+1).toString();
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
                        <Picker
                            selectedValue={selectedValue1}
                            style={{height: 50, width: 100, color: THEME.MAIN_COLOR, fontSize: 36}}
                            onValueChange={(itemValue, itemIndex) => {
                                firstChangeHandler(itemValue);
                            }}
                        >
                            {
                                props.data.currencies.map((currency)=> <Picker.Item key={Date.now()} label={currency} value={currency}/>)
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

                            }}
                        >
                            {
                                props.data.currencies.map((currency)=> <Picker.Item key={Date.now()} label={currency} value={currency}/>)
                            }
                        </Picker>
                        <AppText style={{color: THEME.MAIN_COLOR, fontSize: 28, width: 190}}
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
