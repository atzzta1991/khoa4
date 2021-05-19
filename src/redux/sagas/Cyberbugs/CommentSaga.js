import { call, put, takeLatest } from "@redux-saga/core/effects";
import { commentService } from "../../../services/CommentService";
import { STATUS_CODE } from "../../../utils/constants/systemSettings";
import {
  DELETE_COMMENT_SAGA,
  GET_ALL_COMMENTS,
  GET_ALL_COMMENTS_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../../constants/Cyberbugs/CommentConst";

function* getAllCommentsSaga(action) {
  try {
    const { data, status } = yield call(
      commentService.getAllComment,
      action.taskId
    );

    if (status === STATUS_CODE.SUCCESS) {
      yield put({
        type: GET_ALL_COMMENTS,
        allComments: data.content,
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* watchGetAllCommentsSaga() {
  yield takeLatest(GET_ALL_COMMENTS_SAGA, getAllCommentsSaga);
}

function* insertCommentSaga(action) {
  const { newComment } = action;
  try {
    const { status } = yield call(commentService.insertComment, newComment);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_COMMENTS_SAGA, taskId: newComment.taskId });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* watchInsertCommentSaga() {
  yield takeLatest(INSERT_COMMENT_SAGA, insertCommentSaga);
}

function* deleteCommentSaga(action) {
  const { id, taskId } = action.deletedComment;
  try {
    const { status } = yield call(commentService.deleteComment, id);
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_COMMENTS_SAGA, taskId });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* watchDeleteCommentSaga() {
  yield takeLatest(DELETE_COMMENT_SAGA, deleteCommentSaga);
}

function* updateCommentSaga(action) {
  console.log(action);
  const { id, contentComment, taskId } = action.updatedComment;
  try {
    const { status } = yield call(commentService.updateComment, {
      id,
      contentComment,
    });
    if (status === STATUS_CODE.SUCCESS) {
      yield put({ type: GET_ALL_COMMENTS_SAGA, taskId });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response.data);
  }
}

export function* watchUpdateCommentSaga() {
  yield takeLatest(UPDATE_COMMENT_SAGA, updateCommentSaga);
}
