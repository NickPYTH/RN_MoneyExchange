import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {THEME} from "../themes";
import AppText from "./UI/AppText";
import {AppButton} from "./UI/AppButton";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {addValue, cutValue, fullCutValue} from "../store/actions";

const Number = props => {
    if (props.value !== '')
        return(
            <TouchableOpacity onPress={()=>{props.changeValue(props.value)}} style={{flex: 1, justifyContent: 'center', alignItems: 'center', borderColor: THEME.MAIN_COLOR, borderRadius: 25, borderWidth: 2, margin: 5}}>
                <AppText style={{color: THEME.MAIN_COLOR, fontSize: 22}} value={props.value}/>
            </TouchableOpacity>
        )
    else{
        return(<View/>)
    }
}

function Page(props) {
    return (
            <View style={styles.wrapper}>
                <View style={styles.keyboard}>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value='7'/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value='8'/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value='9'/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value='4'/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value='5'/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value='6'/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value='1'/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value='2'/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value='3'/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value=''/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value='0'/></View>
                    <View style={styles.numberButton}><Number changeValue={props.addValue} value=''/></View>
                </View>
                <View style={styles.buttons}>
                    <AppButton onPress={props.fullCutValue}title='AC' iconName='' styles={styles.button}/>
                    <AppButton onPress={props.cutValue} title='' iconName='keyboard-arrow-left' styles={styles.button}/>
                </View>
            </View>
    );
}

const mapStateToProps = (state) => {
    const { flats } = state;
    return { flats };
};

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            addValue,
            cutValue,
            fullCutValue
        },
        dispatch
    );

export const Keyboard = connect(mapStateToProps, mapDispatchToProps)(Page);

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        flexDirection: 'row',
    },
    keyboard: {
        flex: 2,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    buttons: {
        flexDirection: 'column',
        padding: 5,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: '75%',
    },
    button: {
        height: 200,
        borderRadius: 25,
        backgroundColor: THEME.LIGHT_COLOR,
        borderColor: THEME.MAIN_COLOR,
        borderWidth: 2
    },
    numberButton: {
        fontSize: 16,
        width:'33%',
        height: '25%',
    }
});
