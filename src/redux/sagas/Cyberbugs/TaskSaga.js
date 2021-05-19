import { call, delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../utils/constants/systemSettings";
import { notiFunction } from "../../../utils/Notification/notificationCyberbugs";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_TASK_DETAIL,
  GET_TASK_DETAIL_SAGA,
  HANDLE_CHANGE_POST_API,
  REMOVE_USER_ASSIGN,
  UPDATE_STATUS_TASK_SAGA,
} from "../../constants/Cyberbugs/TaskConst";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

function* createTaskSaga(action) {
  // console.log(action.taskObject);
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(300);
  try {
    const { data, status } = yield call(
      taskService.createTask,
      action.taskObject
    );
    console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      notiFunction("success", "Create task successfully!");
      yield put({
        type: "CLOSE_DRAWER",
      });
    }
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchCreateTaskSaga() {
  yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}

function* getTaskDetailSaga(action) {
  try {
    const { data, status } = yield call(
      taskService.getTaskDetail,
      action.taskId
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_TASK_DETAIL, taskDetailModal: data.content });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
}

export function* watchGetTaskDetailSaga() {
  yield takeLatest(GET_TASK_DETAIL_SAGA, getTaskDetailSaga);
}

function* updateTaskStatusSaga(action) {
  const { taskUpdateStatus } = action;
  //console.log(taskUpdateStatus);
  try {
    const { data, status } = yield call(
      taskService.updateStatusTask,
      taskUpdateStatus
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId: taskUpdateStatus.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateStatus.taskId,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.reponse?.data);
  }
}

export function* watchUpdateTaskStatusSaga() {
  yield takeLatest(UPDATE_STATUS_TASK_SAGA, updateTaskStatusSaga);
}

function* handleChangePostApi(action) {
  switch (action.actionType) {
    case CHANGE_TASK_MODAL:
      {
        const { name, value } = action;
        yield put({
          type: CHANGE_TASK_MODAL,
          name,
          value,
        });
      }
      break;
    case CHANGE_ASSIGNESS:
      {
        const { userSelect } = action;
        yield put({
          type: CHANGE_ASSIGNESS,
          userSelect,
        });
      }
      break;
    case REMOVE_USER_ASSIGN:
      {
        const { userId } = action;
        yield put({
          type: REMOVE_USER_ASSIGN,
          userId,
        });
      }
      break;
    default:
      break;
  }

  let { taskDetailModal } = yield select((state) => state.TaskReducer);

  const listUserAsign = taskDetailModal.assigness?.map((user, index) => {
    return user.id;
  });

  const taskUpdateApi = { ...taskDetailModal, listUserAsign };
  console.log(taskUpdateApi);
  try {
    const { status } = yield call(taskService.updateTask, taskUpdateApi);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_DETAIL_SAGA",
        projectId: taskUpdateApi.projectId,
      });

      yield put({
        type: GET_TASK_DETAIL_SAGA,
        taskId: taskUpdateApi.taskId,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.reponse?.data);
  }
}

export function* watchHandleChangePostApi() {
  yield takeLatest(HANDLE_CHANGE_POST_API, handleChangePostApi);
}
