import { call, delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../utils/constants/systemSettings";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

function* createProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  try {
    const { status } = yield call(
      cyberbugsService.createProjectAuthorization,
      action.newProject
    );
    if (status === STATUS_CODE.SUCCESS) {
      const history = yield select((state) => state.HistoryReducer.history);
      history.push("/projectmanagement");
    }
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchCreateProjectSaga() {
  yield takeLatest("CREATE_PROJECT_SAGA", createProjectSaga);
}

function* getListProjectSaga(action) {
  try {
    const { data, status } = yield call(cyberbugsService.getListProject);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_PROJECT_LIST",
        projectList: data.content,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetListProjectSaga() {
  yield takeLatest("GET_ALL_PROJECT_SAGA", getListProjectSaga);
}

function* updateProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);
  try {
    const { data, status } = yield call(
      cyberbugsService.updateProject,
      action.projectUpdate
    );
    if (status === STATUS_CODE.SUCCESS) {
      console.log(data);
      yield call(getListProjectSaga);

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

export function* watchUpdateProjectSaga() {
  yield takeLatest("UPDATE_PROJECT_SAGA", updateProjectSaga);
}

function* deleteProjectSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);
  try {
    const promise = yield call(projectService.deleteProject, action.projectId);
    console.log(promise);
    // if (status === STATUS_CODE.SUCCESS) {
    //   yield call(getListProjectSaga);

    //   yield put({
    //     type: "CLOSE_DRAWER",
    //   });
    // }
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchDeleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}
