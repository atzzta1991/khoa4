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
import { TaskTypeReducer } from "./reducers/TaskTypeReducer";
import { PriorityReducer } from "./reducers/PriorityReducer";
import { StatusReducer } from "./reducers/StatusReducer";
import { TaskReducer } from "./reducers/TaskReducer";
import { CommentReducer } from "./reducers/CommentReducer";

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
  TaskTypeReducer,
  PriorityReducer,
  StatusReducer,
  TaskReducer,
  CommentReducer,
});

const store = createStore(
  rootReducer,
  applyMiddleware(reduxThunk, middlewareSaga)
);

middlewareSaga.run(rootSaga);

export default store;
