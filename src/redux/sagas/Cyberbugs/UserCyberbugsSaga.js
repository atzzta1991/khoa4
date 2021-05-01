import { call, delay, put, select, takeLatest } from "@redux-saga/core/effects";
import { cyberbugsService } from "../../../services/CyberbugsService";
import { TOKEN, USER_LOGIN } from "../../../utils/constants/systemSettings";
import { USER_SIGNIN_API, US_LOGIN } from "../../constants/Cyberbugs/Cyberbugs";
import { DISPLAY_LOADING, HIDE_LOADING } from "../../constants/LoadingConst";

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
