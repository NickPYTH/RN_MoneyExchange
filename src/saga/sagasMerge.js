import { all } from "redux-saga/effects";
import { getDailyCoursesWatcher } from "./getDailyCourseSaga";
import { getCourseByDateWatcher } from "./getCourseByDateSaga";

export function* rootWatcher() {
  yield all([getDailyCoursesWatcher(), getCourseByDateWatcher()]);
}
