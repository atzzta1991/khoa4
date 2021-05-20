import { all } from "redux-saga/effects";
import * as ToDoListSaga from "./ToDoListSaga";
import * as UserCyberbugsSaga from "./Cyberbugs/UserCyberbugsSaga";
import * as ProjectCategorySaga from "./Cyberbugs/ProjectCategorySaga";
import * as ProjectSaga from "./Cyberbugs/ProjectSaga";
import * as TaskTypeSaga from "./Cyberbugs/TaskTypeSaga";
import * as PrioritySaga from "./Cyberbugs/PrioritySaga";
import * as TaskSaga from "./Cyberbugs/TaskSaga";
import * as StatusSaga from "./Cyberbugs/StatusSaga";
import * as CommentSaga from "./Cyberbugs/CommentSaga";

export function* rootSaga() {
  yield all([
    ToDoListSaga.trackGetTaskApiAction(),
    ToDoListSaga.watchAddTaskApiAction(),
    ToDoListSaga.watchDeleteTaskApiAction(),

    UserCyberbugsSaga.watchSignIn(),
    UserCyberbugsSaga.watchGetUsers(),
    UserCyberbugsSaga.watchAddUserProjectSaga(),
    UserCyberbugsSaga.watchRemoveUserProjectSaga(),
    UserCyberbugsSaga.watchGetUserByProjectIdSaga(),
    UserCyberbugsSaga.watchSignupSaga(),
    UserCyberbugsSaga.watchEditUserSaga(),

    ProjectCategorySaga.watchGetAllProjectCategory(),
    ProjectSaga.watchCreateProjectSaga(),
    ProjectSaga.watchGetListProjectSaga(),
    ProjectSaga.watchUpdateProjectSaga(),
    ProjectSaga.watchDeleteProjectSaga(),
    ProjectSaga.watchGetProjectDetailSaga(),
    ProjectSaga.watchGetAllProjectSaga(),

    TaskTypeSaga.watchGetAllTaskTypeSaga(),

    PrioritySaga.watchGetAllPrioritySaga(),

    TaskSaga.watchCreateTaskSaga(),
    TaskSaga.watchGetTaskDetailSaga(),
    TaskSaga.watchUpdateTaskStatusSaga(),
    TaskSaga.watchHandleChangePostApi(),

    StatusSaga.watchGetAllStatusSaga(),

    CommentSaga.watchGetAllCommentsSaga(),
    CommentSaga.watchInsertCommentSaga(),
    CommentSaga.watchDeleteCommentSaga(),
    CommentSaga.watchUpdateCommentSaga(),
  ]);
}
