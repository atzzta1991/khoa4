import { call, put, takeLatest } from "@redux-saga/core/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { STATUS_CODE } from "../../../utils/constants/systemSettings";
import {
  GET_ALL_PROJECT_CATEGORY,
  GET_ALL_PROJECT_CATEGORY_SAGA,
} from "../../constants/Cyberbugs/Cyberbugs";

function* getAllProjectCategorySaga(action) {
  try {
    const { data, status } = yield call(cyberbugsService.getAllProjectCategory);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_PROJECT_CATEGORY, data: data.content });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetAllProjectCategory() {
  yield takeLatest(GET_ALL_PROJECT_CATEGORY_SAGA, getAllProjectCategorySaga);
}
