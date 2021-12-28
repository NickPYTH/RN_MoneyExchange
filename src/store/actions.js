import {
  ADD_DIGIT,
  CLEAR_INPUT,
  FETCH_COURSE_BY_DATE,
  FETCH_DAILY_COURSES,
  REMOVE_DIGIT,
  SET_COURSES,
  SET_DATE,
  SET_FROM_CURRENCY,
  SET_TO_CURRENCY,
} from "./types";

export const addDigit = (digit) => {
  return {
    type: ADD_DIGIT,
    digit,
  };
};

export const removeDigit = () => {
  return {
    type: REMOVE_DIGIT,
  };
};

export const clearInput = () => {
  return {
    type: CLEAR_INPUT,
  };
};

export const fetchDailyCourses = () => {
  return {
    type: FETCH_DAILY_COURSES,
  };
};

export const setCourses = (courses) => {
  return {
    type: SET_COURSES,
    courses,
  };
};

export const setToCurrency = (currency) => {
  return {
    type: SET_TO_CURRENCY,
    currency,
  };
};

export const setFromCurrency = (currency) => {
  return {
    type: SET_FROM_CURRENCY,
    currency,
  };
};

export const setDate = (date) => {
  return {
    type: SET_DATE,
    date,
  };
};

export const fetchCourseByDate = (date) => {
  return {
    type: FETCH_COURSE_BY_DATE,
    date,
  };
};
