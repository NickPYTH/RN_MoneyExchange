import { applyMiddleware, combineReducers, createStore } from "redux";
import { reducer } from "./reducers";
import createSagaMiddleware from "redux-saga";
import { rootWatcher } from "../saga/sagasMerge";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  reducer,
});

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootWatcher);
