import { applyMiddleware, combineReducers, createStore } from "redux";
import { ToDoListReducers } from "./reducers/ToDoListReducers";
import { LoadingReducer } from "./reducers/LoadingReducer";
import reduxThunk from "redux-thunk";
import createMiddlewareSaga from "redux-saga";
import { rootSaga } from "./sagas/rootSaga";
import { HistoryReducer } from "./reducers/HistoryReducer";
import { UserCyberbugsReducer } from "./reducers/UserCyberbugsReducer";
import { ProjectCategoryReducer } from "./reducers/ProjectCategoryReducer";
import { ProjectCyberbugsReducer } from "./reducers/ProjectCyberbugsReducer";
import { DrawerCyberbugsReducer } from "./reducers/DrawerCyberbugsReducer";
import { ProjectReducer } from "./reducers/ProjectReducer";

const middlewareSaga = createMiddlewareSaga();

const rootReducer = combineReducers({
  ToDoListReducers,
  LoadingReducer,
  HistoryReducer,
  UserCyberbugsReducer,
  ProjectCategoryReducer,
  ProjectCyberbugsReducer,
  DrawerCyberbugsReducer,
  ProjectReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middlewareSaga)
);

middlewareSaga.run(rootSaga);

export default store;
