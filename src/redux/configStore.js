import { applyMiddleware, combineReducers, createStore } from "redux";
import ToDoListReducers from "./reducers/ToDoListReducers";
import LoadingReducer from "./reducers/LoadingReducer";
import reduxThunk from "redux-thunk";
import createMiddlewareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";

const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({ ToDoListReducers, LoadingReducer });

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middlewareSaga)
);

middlewareSaga.run(rootSaga);

export default store;
