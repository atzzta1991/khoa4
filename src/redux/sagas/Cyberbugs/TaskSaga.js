import { call, delay, put, takeLatest } from "@redux-saga/core/effects";
import { taskService } from "../../../services/TaskService";
import { STATUS_CODE } from "../../../utils/constants/systemSettings";
import { notiFunction } from "../../../utils/Notification/notificationCyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

function* createTaskSaga(action) {
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
      yield put({
        type: "CLOSE_DRAWER",
      });
      notiFunction("Success", "Create task successfully!");
    }
  } catch (error) {
    console.log(error.response);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchCreateTaskSaga() {
  yield takeLatest("CREATE_TASK_SAGA", createTaskSaga);
}
