import { call, put, takeLatest, delay } from "redux-saga/effects";
import { toDoListService } from "../../services/ToDoListService";
import { STATUS_CODE } from "../../utils/constants/systemSettings";
import { DISPLAY_LOADING, HIDE_LOADING } from "../constants/LoadingConst";
import {
  ADD_TASK_API_SAGA,
  DELETE_TASK_API_SAGA,
  GET_TASKS_API,
  GET_TASK_API_SAGA,
} from "../constants/ToDoListConstants";

/**
 * Action saga lay task list tu api
 * @param {action} action
 */
function* getTaskApiAction(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    yield delay(300);
    const { data, status } = yield call(toDoListService.getTaskApi);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASKS_API,
        taskList: data,
      });
    }
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* trackGetTaskApiAction() {
  yield takeLatest(GET_TASK_API_SAGA, getTaskApiAction);
}

/**
 * Action saga add task tu api
 */
function* addTaskApiAction(action) {
  const { taskName } = action.taskName;

  try {
    const { status } = yield call(toDoListService.addTaskApi, taskName);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API_SAGA,
      });
    } else {
      console.log("error");
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchAddTaskApiAction() {
  yield takeLatest(ADD_TASK_API_SAGA, addTaskApiAction);
}

/**
 * Action saga delete task tu api
 */
function* deleteTaskApiAction(action) {
  try {
    const { status } = yield call(
      toDoListService.deleteTaskApi,
      action.taskName
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_TASK_API_SAGA,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchDeleteTaskApiAction() {
  yield takeLatest(DELETE_TASK_API_SAGA, deleteTaskApiAction);
}
