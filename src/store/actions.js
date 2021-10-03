export const addValue = (value) => {
    return {
        type: "ADD_VALUE",
        payload: value,
    };
};

export const cutValue = () => {
    return {
        type: "CUT_VALUE",
    };
};

export const fullCutValue = () => {
    return {
        type: "FULL_CUT_VALUE",
    };
};

export const changeDate = (date) => {
    return {
        type: "CHANGE_DATE",
        payload: date,
    };
};

export const loadCurrencies = (currencies) => {
    return {
        type: "LOAD_CURRENCIES",
        payload: currencies,
    };
};

export const putCoefficient = (coefficient) => {
    return {
        type: "PUT_COEFFICIENT",
        payload: coefficient,
    };
};