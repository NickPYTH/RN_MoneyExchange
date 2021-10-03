import {combineReducers} from "redux";

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

const INITIAL_STATE = {
    value: 100,
    date: getHumanDate(new Date()),
    coefficient: 0.7,
    isLoad: false,
    currencies: null,
};

const Data = (state = INITIAL_STATE, action) => {
    let tmp = null
    switch (action.type) {
        case "ADD_VALUE":
            tmp = state.value.toString()
            if (tmp.length > 7){
                return {
                    ...state
                }
            }
            return {
                ...state,
                value: Number(state.value.toString().concat(action.payload.toString())),
            };
        case "CUT_VALUE":
            if (state.value.toString().length !== 1)
                tmp = Number(state.value.toString().slice(0, -1));
            else
                tmp = 0;
            return {
                ...state,
                value: tmp,
            };
        case "FULL_CUT_VALUE":
            return {
                ...state,
                value: 0,
            };
        case "CHANGE_DATE":
            return {
                ...state,
                date: getHumanDate(action.payload),
            };
        case "LOAD_CURRENCIES":
            let prepCurrencies = [];
            let soloCurrencies = [];
            JSON.parse(action.payload).data.map((pair)=>{
                prepCurrencies.push(pair.slice(0,3));
                prepCurrencies.push(pair.slice(3,6));
            })

            prepCurrencies.map((el)=>{
                if (soloCurrencies.indexOf(el) === -1){
                    soloCurrencies.push(el);
                }
            });

            return {
                ...state,
                isLoad: true,
                currencies: soloCurrencies,
            };
        case "PUT_COEFFICIENT":
            return {
                ...state,
                coefficient: action.payload,
            };
        default:
            return state;
    }
};

export default combineReducers({
    data: Data,
});