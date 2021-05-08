import { call, put, takeLatest } from "@redux-saga/core/effects";
import { taskTypeService } from "../../../services/TaskTypeService";
import {
  GET_ALL_TASK_TYPE,
  GET_ALL_TASK_TYPE_SAGA,
} from "../../constants/Cyberbugs/TaskTypeConst";

function* getAllTaskTypeSaga() {
  try {
    const { data } = yield call(taskTypeService.getAllTaskType);

    yield put({
      type: GET_ALL_TASK_TYPE,
      arrTaskType: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetAllTaskTypeSaga() {
  yield takeLatest(GET_ALL_TASK_TYPE_SAGA, getAllTaskTypeSaga);
}
