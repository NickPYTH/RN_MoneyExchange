import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_DAILY_COURSES } from "../store/types";
import { setCourses } from "../store/actions";

const getDailyCourses = () => {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  return fetch("https://www.cbr-xml-daily.ru/daily_json.js", requestOptions);
};

function* getDailyCoursesWorker() {
  const data = yield call(getDailyCourses);
  const json = yield call(() => new Promise((res) => res(data.json())));
  yield put(setCourses(json));
}

export function* getDailyCoursesWatcher() {
  yield takeEvery(FETCH_DAILY_COURSES, getDailyCoursesWorker);
}
