import { call, delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { userService } from "../../../services/UserService";
import {
  STATUS_CODE,
  TOKEN,
  USER_LOGIN,
} from "../../../utils/constants/systemSettings";
import { USER_SIGNIN_API, US_LOGIN } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";
import {
  EDIT_USER_SAGA,
  GET_USER_API,
  GET_USER_BY_PROJECT_ID,
  GET_USER_BY_PROJECT_ID_SAGA,
  SIGNUP_SAGA,
} from "../../constants/Cyberbugs/UserConst";

function* signinSaga(action) {
  yield put({
    type: DISPLAY_LOADING,
  });
  yield delay(500);
  try {
    const { data } = yield call(
      cyberbugsService.signinCyberbugs,
      action.userLogin
    );
    localStorage.setItem(TOKEN, data.content.accessToken);
    localStorage.setItem(USER_LOGIN, JSON.stringify(data.content));

    yield put({
      type: US_LOGIN,
      userLogin: data.content,
    });

    let history = yield select((state) => state.HistoryReducer.history);
    history.push("/home");
  } catch (error) {
    console.log(error.response.data);
  }

  yield put({
    type: HIDE_LOADING,
  });
}

export function* watchSignIn() {
  yield takeLatest(USER_SIGNIN_API, signinSaga);
}

function* getUsersSaga(action) {
  try {
    const { data, status } = yield call(userService.getUsers, action.keyword);

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: "GET_USER_SEARCH",
        lstUserSearch: data.content,
      });
    }
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchGetUsers() {
  yield takeLatest(GET_USER_API, getUsersSaga);
}

function* addUserProjectSaga(action) {
  try {
    yield call(userService.assignUserProject, action.userProject);

    yield put({
      type: "GET_ALL_PROJECT_SAGA",
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchAddUserProjectSaga() {
  yield takeLatest("ADD_USER_PROJECT_API", addUserProjectSaga);
}

function* removeUserProjectSaga(action) {
  try {
    yield call(userService.removeUserProject, action.userProject);

    yield put({
      type: "GET_ALL_PROJECT_SAGA",
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export function* watchRemoveUserProjectSaga() {
  yield takeLatest("REMOVE_USER_PROJECT_API", removeUserProjectSaga);
}

function* getUserByProjectIdSaga(action) {
  try {
    const { data, status } = yield call(
      userService.getUserByProjectId,
      action.idProject
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
    if (error.response.data.statusCode === STATUS_CODE.NOT_FOUND) {
      yield put({
        type: GET_USER_BY_PROJECT_ID,
        arrUser: [],
      });
    }
  }
}

export function* watchGetUserByProjectIdSaga() {
  yield takeLatest(GET_USER_BY_PROJECT_ID_SAGA, getUserByProjectIdSaga);
}

function* signupSaga(action) {
  const { newUser } = action;
  try {
    const { status } = yield call(userService.signup, newUser);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_API,
        keyword: "",
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.reponse?.data);
  }
}

export function* watchSignupSaga() {
  yield takeLatest(SIGNUP_SAGA, signupSaga);
}

function* editUserSaga(action) {
  const { editedUser } = action;
  try {
    const { data, status } = yield call(userService.editUser, editedUser);
    console.log(data);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_USER_API,
        keyword: "",
      });
      yield put({
        type: "CLOSE_DRAWER",
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.reponse?.data);
  }
}

export function* watchEditUserSaga() {
  yield takeLatest(EDIT_USER_SAGA, editUserSaga);
}
