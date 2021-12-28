import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_COURSE_BY_DATE } from "../store/types";
import { setCourses } from "../store/actions";

const getCourseByDate = (date) => {
  let requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  return fetch(
    `https://www.cbr-xml-daily.ru/archive/${date.getFullYear()}/${date.getMonth()}/${date.getDate()}/daily_json.js`,
    requestOptions
  );
};

function* getCourseByDateWorker(date) {
  const data = yield call(getCourseByDate, date.date);
  const json = yield call(() => new Promise((res) => res(data.json())));
  yield put(setCourses(json));
}

export function* getCourseByDateWatcher() {
  yield takeEvery(FETCH_COURSE_BY_DATE, getCourseByDateWorker);
}
