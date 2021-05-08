import { call, put, takeLatest } from "@redux-saga/core/effects";
import {
  GET_ALL_PRIORITY,
  GET_ALL_PRIORITY_SAGA,
} from "../../constants/Cyberbugs/PriorityConst";
import { priorityService } from "../../../services/PriorityService";
function* getAllPrioritySaga() {
  try {
    const { data } = yield call(priorityService.getAllPriority);

    yield put({
      type: GET_ALL_PRIORITY,
      arrPriority: data.content,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetAllPrioritySaga() {
  yield takeLatest(GET_ALL_PRIORITY_SAGA, getAllPrioritySaga);
}
