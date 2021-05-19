import { call, delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { projectService } from "../../../services/ProjectService";
import { STATUS_CODE } from "../../../utils/constants/systemSettings";
import { notiFunction } from "../../../utils/Notification/notificationCyberbugs";
import {
  GET_ALL_PROJECT,
  GET_ALL_PROJECT_SAGA,
} from "../../constants/Cyberbugs/ProjectConst";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../constants/Cyberbugs/UserConst";
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
  console.log(action.projectUpdate);
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);
  try {
    const { status } = yield call(
      cyberbugsService.updateProject,
      action.projectUpdate
    );

    if (status === STATUS_CODE.SUCCESS) {
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
    const { status } = yield call(
      projectService.deleteProject,
      action.projectId
    );

    if (status === STATUS_CODE.SUCCESS) {
      notiFunction("success", "Delete project successfully");

      yield call(getListProjectSaga);

      yield put({
        type: "CLOSE_DRAWER",
      });
    } else {
      notiFunction("error", "Delete project failed");
    }
  } catch (error) {
    console.log(error);
    notiFunction("error", "Delete project failed");
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchDeleteProjectSaga() {
  yield takeLatest("DELETE_PROJECT_SAGA", deleteProjectSaga);
}

function* getProjectDetailSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });

  yield delay(500);
  try {
    const { data } = yield call(
      projectService.getProjectDetail,
      action.projectId
    );

    yield put({ type: "PUT_PROJECT_DETAIL", projectDetail: data.content });
  } catch (error) {
    console.log(error);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchGetProjectDetailSaga() {
  yield takeLatest("GET_PROJECT_DETAIL_SAGA", getProjectDetailSaga);
}

function* getAllProjectSaga() {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(300);
  try {
    const { data } = yield call(projectService.getAllProject);
    yield put({ type: GET_ALL_PROJECT, arrProject: data.content });

    yield put({
      type: GET_USER_BY_PROJECT_ID_SAGA,
      idProject: data.content[0]?.id,
    });
  } catch (error) {
    console.log(error);
  }
  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchGetAllProjectSaga() {
  yield takeLatest(GET_ALL_PROJECT_SAGA, getAllProjectSaga);
}
