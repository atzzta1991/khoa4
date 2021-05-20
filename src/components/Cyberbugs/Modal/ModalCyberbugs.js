import React, { useEffect, useState } from "react";
import { Popconfirm } from "antd";
import { useSelector, useDispatch } from "react-redux";
import ReactHtmlParser from "react-html-parser";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConst";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Cyberbugs/PriorityConst";
import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  HANDLE_CHANGE_POST_API,
  REMOVE_USER_ASSIGN,
} from "../../../redux/constants/Cyberbugs/TaskConst";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/Cyberbugs/TaskTypeConst";
import { Editor } from "@tinymce/tinymce-react";
import { Select } from "antd";
import {
  DELETE_COMMENT_SAGA,
  GET_ALL_COMMENTS_SAGA,
  INSERT_COMMENT_SAGA,
  UPDATE_COMMENT_SAGA,
} from "../../../redux/constants/Cyberbugs/CommentConst";

export default function ModalCyberbugs(props) {
  const { taskDetailModal } = useSelector((state) => state.TaskReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { projectDetail } = useSelector((state) => state.ProjectReducer);
  const { userLogin } = useSelector((state) => state.UserCyberbugsReducer);
  const { lstComment } = useSelector((state) => state.CommentReducer);
  const [visibleEditor, setVisibleEditor] = useState(false);
  const [historyContent, setHistoryContent] = useState(
    taskDetailModal.description
  );
  const [content, setContent] = useState(taskDetailModal.description);
  const [contentComment, setContentComment] = useState("");
  const [contentCommentEdit, setContentCommentEdit] = useState("");
  const [commentEditable, setCommentEditable] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    let taskId = taskDetailModal.taskId;
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_COMMENTS_SAGA, taskId });
  }, [dispatch, taskDetailModal.taskId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: HANDLE_CHANGE_POST_API,
      actionType: CHANGE_TASK_MODAL,
      name,
      value,
    });
  };

  const handleEditorChange = (e) => {
    setContent(e.target.getContent());
  };

  const renderDescription = () => {
    const jsxDescription = ReactHtmlParser(taskDetailModal.description);
    return (
      <div>
        {visibleEditor ? (
          <div>
            <Editor
              name="description"
              initialValue={taskDetailModal.description}
              init={{
                height: 200,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image",
                  "charmap print preview anchor help",
                  "searchreplace visualblocks code",
                  "insertdatetime media table paste wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | bold italic |  alignleft aligncenter alignright |  bullist numlist outdent indent | help",
              }}
              onChange={handleEditorChange}
            />
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: content,
                });
                setVisibleEditor(false);
              }}
            >
              Save
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={() => {
                dispatch({
                  type: HANDLE_CHANGE_POST_API,
                  actionType: CHANGE_TASK_MODAL,
                  name: "description",
                  value: historyContent,
                });
                setVisibleEditor(false);
              }}
            >
              Close
            </button>
          </div>
        ) : (
          <div
            onClick={() => {
              setHistoryContent(taskDetailModal.description);
              setVisibleEditor(!visibleEditor);
            }}
          >
            {jsxDescription}
          </div>
        )}
      </div>
    );
  };

  const renderTimeTracking = () => {
    const { timeTrackingSpent, timeTrackingRemaining } = taskDetailModal;

    const max = Number(timeTrackingSpent) + Number(timeTrackingRemaining);

    const percent = Math.round((Number(timeTrackingSpent) / max) * 100);

    return (
      <div>
        <div style={{ display: "flex" }}>
          <i className="fa fa-clock" />
          <div style={{ width: "100%" }}>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${percent}%` }}
                aria-valuenow={Number(timeTrackingSpent)}
                aria-valuemin={Number(timeTrackingRemaining)}
                aria-valuemax={max}
              />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p className="logged">{Number(timeTrackingSpent)}h logged</p>
              <p className="estimate-time">
                {Number(timeTrackingRemaining)}h estimated
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingSpent"
              onChange={handleChange}
            />
          </div>
          <div className="col-6">
            <input
              className="form-control"
              name="timeTrackingRemaining"
              onChange={handleChange}
            />
          </div>
        </div>
      </div>
    );
  };

  const handleChangeComment = (e) => {
    let { value } = e.target;
    setContentComment(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newComment = {
      taskId: taskDetailModal.taskId,
      contentComment,
    };
    dispatch({
      type: INSERT_COMMENT_SAGA,
      newComment,
    });
    setContentComment("");
  };

  // const handleSubmitEdit = (e) => {
  //   e.preventDefault();
  //   dispatch({type: UPDATE_COMMENT_SAGA, })
  // };

  const renderListComment = () => {
    return lstComment
      .map((comment, index) => {
        return (
          <div className="comment-item mb-3" key={index}>
            <div className="display-comment" style={{ display: "flex" }}>
              {/* Comment Avatar */}
              <div className="avatar">
                <img src={comment.user.avatar} alt="" />
              </div>
              <div>
                {/* Comment Username & time */}
                <p style={{ marginBottom: 5 }}>
                  {comment.user.name} - <span>a month ago</span>
                </p>

                {/* Comment Content */}
                {commentEditable ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      dispatch({
                        type: UPDATE_COMMENT_SAGA,
                        updatedComment: {
                          id: comment.id,
                          contentComment: contentCommentEdit,
                          taskId: comment.taskId,
                        },
                      });
                      setCommentEditable(false);
                    }}
                  >
                    <input
                      type="text"
                      name="commentEdit"
                      value={contentCommentEdit}
                      onChange={(e) => {
                        let { value } = e.target;
                        setContentCommentEdit(value);
                      }}
                    />
                    <button
                      type="button"
                      className="btn btn-default btn-sm"
                      onClick={() => {
                        setCommentEditable(false);
                      }}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <p style={{ marginBottom: 5 }}>{comment.contentComment}</p>
                )}

                <div>
                  {/* Edit Button */}
                  <a
                    href="#"
                    onClick={() => {
                      setCommentEditable(true);
                      setContentCommentEdit(comment.contentComment);
                    }}
                  >
                    Edit
                  </a>
                  <span> • </span>
                  {/* Delete Button */}
                  <Popconfirm
                    title="Are you sure to delete this comment?"
                    onConfirm={() => {
                      dispatch({
                        type: DELETE_COMMENT_SAGA,
                        deletedComment: comment,
                      });
                    }}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a href="#">Delete</a>
                  </Popconfirm>
                </div>
              </div>
            </div>
          </div>
        );
      })
      .reverse();
  };

  return (
    <div
      className="modal fade"
      id="infoModal"
      tabIndex={-1}
      role="dialog"
      aria-labelledby="infoModal"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-info">
        <div className="modal-content">
          <div className="modal-header">
            <div className="task-title">
              <i className="fa fa-bookmark" />
              <select
                name="typeId"
                value={taskDetailModal.typeId}
                onChange={handleChange}
              >
                {arrTaskType.map((tp, index) => {
                  return (
                    <option value={tp.id} key={index}>
                      {tp.taskType}
                    </option>
                  );
                })}
              </select>
            </div>
            <div style={{ display: "flex" }} className="task-click">
              <div>
                <i className="fab fa-telegram-plane" />
                <span style={{ paddingRight: 20 }}>Give feedback</span>
              </div>
              <div>
                <i className="fa fa-link" />
                <span style={{ paddingRight: 20 }}>Copy link</span>
              </div>
              <i className="fa fa-trash-alt" style={{ cursor: "pointer" }} />
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
          </div>
          <div className="modal-body">
            <div className="container-fluid">
              <div className="row">
                <div className="col-8">
                  <p className="issue">This is an issue of type: Task.</p>
                  <div className="description">
                    <p>Description</p>
                    {renderDescription()}
                  </div>
                  <div style={{ fontWeight: 500, marginBottom: 10 }}>
                    Jira Software (software projects) issue types:
                  </div>
                  <div className="title">
                    <div className="title-item">
                      <h3>
                        BUG <i className="fa fa-bug" />
                      </h3>
                      <p>
                        A bug is a problem which impairs or prevents the
                        function of a product.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        STORY <i className="fa fa-book-reader" />
                      </h3>
                      <p>
                        A user story is the smallest unit of work that needs to
                        be done.
                      </p>
                    </div>
                    <div className="title-item">
                      <h3>
                        TASK <i className="fa fa-tasks" />
                      </h3>
                      <p>A task represents work that needs to be done</p>
                    </div>
                  </div>
                  <div className="comment">
                    <h6>Comment</h6>
                    <div className="block-comment" style={{ display: "flex" }}>
                      {/* Comment Avatar */}
                      <div className="avatar">
                        <img src={userLogin.avatar} alt="" />
                      </div>
                      {/* Comment Form */}
                      <div className="input-comment">
                        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
                          <input
                            name="contentComment"
                            className="form-control"
                            type="text"
                            placeholder="Add a comment ..."
                            value={contentComment}
                            onChange={handleChangeComment}
                          />
                          <button type="submit" className="btn btn-primary m-2">
                            Save
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => {
                              setContentComment("");
                            }}
                          >
                            Cancel
                          </button>
                          <p>
                            <span style={{ fontWeight: 500, color: "gray" }}>
                              Protip:
                            </span>
                            <span>
                              press
                              <span
                                style={{
                                  fontWeight: "bold",
                                  background: "#ecedf0",
                                  color: "#b4bac6",
                                }}
                              >
                                M
                              </span>
                              to comment
                            </span>
                          </p>
                        </form>
                      </div>
                    </div>

                    {/* Comment List */}
                    <div className="lastest-comment">
                      {lstComment.length !== 0 ? (
                        renderListComment()
                      ) : (
                        <p className="text-center">There is no comment</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="status">
                    <h6>STATUS</h6>
                    <select
                      name="statusId"
                      className="custom-select"
                      value={taskDetailModal.statusId}
                      onChange={(e) => {
                        handleChange(e);
                        // const action = {
                        //   type: UPDATE_STATUS_TASK_SAGA,
                        //   taskUpdateStatus: {
                        //     taskId: taskDetailModal.taskId,
                        //     statusId: e.target.value,
                        //     projectId: taskDetailModal.projectId,
                        //   },
                        // };
                        // dispatch(action);
                      }}
                    >
                      {arrStatus.map((status, index) => {
                        return (
                          <option key={index} value={status.statusId}>
                            {status.statusName}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="assignees">
                    <h6>ASSIGNEES</h6>
                    <div style={{ display: "flex" }} className="row">
                      {taskDetailModal.assigness.map((user, index) => {
                        return (
                          <div className="col-6 mt-2 mb-2">
                            <div
                              key={index}
                              style={{ display: "flex" }}
                              className="item"
                            >
                              <div className="avatar">
                                <img src={user.avatar} alt={user.avatar} />
                              </div>
                              <p className="name mt-1 ml-1">
                                {user.name}
                                <i
                                  className="fa fa-times"
                                  style={{ marginLeft: 5, cursor: "pointer" }}
                                  onClick={() => {
                                    dispatch({
                                      type: HANDLE_CHANGE_POST_API,
                                      actionType: REMOVE_USER_ASSIGN,
                                      userId: user.id,
                                    });
                                  }}
                                />
                              </p>
                            </div>
                          </div>
                        );
                      })}

                      <div className="col-6">
                        <i className="fa fa-plus" style={{ marginRight: 5 }} />
                        <Select
                          name="lstUser"
                          style={{ width: "100%" }}
                          className="form-control"
                          onSelect={(value) => {
                            if (value == "0") {
                              return;
                            }

                            let userSelect = projectDetail.members.find(
                              (mem) => mem.userId == value
                            );
                            userSelect = {
                              ...userSelect,
                              id: userSelect.userId,
                            };

                            dispatch({
                              type: HANDLE_CHANGE_POST_API,
                              actionType: CHANGE_ASSIGNESS,
                              userSelect,
                            });
                          }}
                          options={projectDetail.members
                            ?.filter((mem) => {
                              let index = taskDetailModal.assigness?.findIndex(
                                (us) => us.id == mem.userId
                              );
                              if (index !== -1) {
                                return false;
                              }
                              return true;
                            })
                            .map((mem) => {
                              return { value: mem.userId, label: mem.name };
                            })}
                          optionFilterProp="label"
                          value="Add more"
                        ></Select>
                      </div>
                    </div>
                  </div>

                  <div className="priority" style={{ marginBottom: 20 }}>
                    <h6>PRIORITY</h6>
                    <select
                      name="priorityId"
                      className="form-control"
                      value={taskDetailModal.priorityTask?.priorityId}
                      onChange={handleChange}
                    >
                      {arrPriority.map((item, index) => {
                        return (
                          <option key={index} value={item.priorityId}>
                            {item.priority}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="estimate">
                    <h6>ORIGINAL ESTIMATE (HOURS)</h6>
                    <input
                      name="originalEstimate"
                      type="text"
                      className="estimate-hours"
                      value={taskDetailModal.originalEstimate}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="time-tracking">
                    <h6>TIME TRACKING</h6>
                    {renderTimeTracking()}
                  </div>
                  <div style={{ color: "#929398" }}>Create at a month ago</div>
                  <div style={{ color: "#929398" }}>
                    Update at a few seconds ago
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
