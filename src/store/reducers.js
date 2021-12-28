import {
  ADD_DIGIT,
  CLEAR_INPUT,
  REMOVE_DIGIT,
  SET_COURSES,
  SET_DATE,
  SET_FROM_CURRENCY,
  SET_TO_CURRENCY,
} from "./types";

const INITIAL_STATE = {
  inputValue: "",
  currencies_list: null,
  from_currency: null,
  to_currency: null,
  date: null,
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_DIGIT:
      return {
        ...state,
        inputValue: state.inputValue + action.digit,
      };
    case REMOVE_DIGIT:
      return {
        ...state,
        inputValue: state.inputValue.slice(0, -1),
      };
    case CLEAR_INPUT:
      return {
        ...state,
        inputValue: "",
      };
    case SET_COURSES:
      if (action.courses.code === 404) {
        return {
          ...state,
          date: new Date(),
        };
      } else {
        const currencies_list = Object.keys(action.courses.Valute).map(
          (name) => action.courses.Valute[name]
        );
        return {
          ...state,
          currencies_list,
          from_currency: currencies_list.find(
            (currency) => currency.CharCode === "USD"
          ),
          to_currency: currencies_list.find(
            (currency) => currency.CharCode === "EUR"
          ),
        };
      }
    case SET_FROM_CURRENCY:
      return {
        ...state,
        from_currency: state.currencies_list.find(
          (currency) => currency.CharCode === action.currency
        ),
      };
    case SET_TO_CURRENCY:
      return {
        ...state,
        to_currency: state.currencies_list.find(
          (currency) => currency.CharCode === action.currency
        ),
      };
    case SET_DATE:
      return {
        ...state,
        date: action.date,
      };
    default:
      return state;
  }
};
