import { call, put, takeLatest } from "@redux-saga/core/effects";
import { statusService } from "../../../services/StatusService";
import { STATUS_CODE } from "../../../utils/constants/systemSettings";
import {
  GET_ALL_STATUS,
  GET_ALL_STATUS_SAGA,
} from "../../constants/Cyberbugs/StatusConst";

function* getAllStatusSaga() {
  try {
    const { data, status } = yield call(statusService.getAllStatus);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_STATUS, arrStatus: data.content });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
  }
}

export function* watchGetAllStatusSaga() {
  yield takeLatest(GET_ALL_STATUS_SAGA, getAllStatusSaga);
}
