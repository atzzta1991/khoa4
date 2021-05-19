import { Editor } from "@tinymce/tinymce-react";
import { Select, Slider } from "antd";
import { withFormik } from "formik";
import React, { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { GET_ALL_PRIORITY_SAGA } from "../../../redux/constants/Cyberbugs/PriorityConst";
import { GET_ALL_PROJECT_SAGA } from "../../../redux/constants/Cyberbugs/ProjectConst";
import { GET_ALL_STATUS_SAGA } from "../../../redux/constants/Cyberbugs/StatusConst";
import { GET_ALL_TASK_TYPE_SAGA } from "../../../redux/constants/Cyberbugs/TaskTypeConst";
import { GET_USER_BY_PROJECT_ID_SAGA } from "../../../redux/constants/Cyberbugs/UserConst";

const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}
function FormCreateTask(props) {
  const [size, setSize] = useState("default");
  const [timeTracking, setTimeTracking] = useState({
    timeTrackingSpent: 0,
    timeTrackingRemaining: 0,
  });

  const { arrProject } = useSelector((state) => state.ProjectCyberbugsReducer);
  const { arrTaskType } = useSelector((state) => state.TaskTypeReducer);
  const { arrPriority } = useSelector((state) => state.PriorityReducer);
  const { arrStatus } = useSelector((state) => state.StatusReducer);
  const { arrUser } = useSelector((state) => state.UserCyberbugsReducer);

  const userOptions = arrUser.map((user) => {
    return { value: user.userId, label: user.name };
  });

  const { handleChange, handleSubmit, setFieldValue } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: GET_ALL_PROJECT_SAGA });
    dispatch({ type: GET_ALL_TASK_TYPE_SAGA });
    dispatch({ type: GET_ALL_PRIORITY_SAGA });
    dispatch({ type: GET_ALL_STATUS_SAGA });
    dispatch({ type: "SET_SUBMIT_CREATE_TASK", submitForm: handleSubmit });
  }, []);

  const handleEditorChange = (e) => {
    setFieldValue("description", e.target.getContent());
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="form-group">
        <p>Taskname</p>
        <input
          type="text"
          className="form-control"
          name="taskName"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <p>Status</p>
        <select
          name="statusId"
          className="form-control"
          onChange={handleChange}
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
      <div className="form-group">
        <p>Project</p>
        <select
          name="projectId"
          className="form-control"
          onChange={(e) => {
            let { value } = e.target;
            dispatch({
              type: GET_USER_BY_PROJECT_ID_SAGA,
              idProject: value,
            });
            setFieldValue("projectId", value);
          }}
        >
          {arrProject.map((project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.projectName}
              </option>
            );
          })}
        </select>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Priority</p>
            <select
              name="priorityId"
              className="form-control"
              onChange={handleChange}
            >
              {arrPriority.map((priority, index) => {
                return (
                  <option key={index} value={priority.priorityId}>
                    {priority.priority}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="col-6">
            <p>Task Type</p>
            <select
              name="typeId"
              className="form-control"
              onChange={handleChange}
            >
              {arrTaskType.map((taskType, index) => {
                return (
                  <option key={index} value={taskType.id}>
                    {taskType.taskType}
                  </option>
                );
              })}
            </select>
          </div>
        </div>
      </div>
      <div className="form-group">
        <div className="row">
          <div className="col-6">
            <p>Assignees</p>
            <Select
              mode="multiple"
              name="listUserAsign"
              size={size}
              options={userOptions}
              placeholder="Please select"
              onChange={(value) => {
                setFieldValue("listUserAsign", value);
              }}
              optionFilterProp="label"
              onSearch={(value) => {
                dispatch({
                  type: "GET_USER_API",
                  keyword: value,
                });
              }}
              style={{ width: "100%" }}
            >
              {children}
            </Select>
            <div className="row mt-3">
              <div className="col-12">
                <p>Original Estimate</p>
                <input
                  type="number"
                  min="0"
                  name="originalEstimate"
                  defaultValue="0"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>
          <div className="col-6">
            <p>Time Tracking</p>
            <Slider
              defaultValue={30}
              value={timeTracking.timeTrackingSpent}
              max={
                Number(timeTracking.timeTrackingSpent) +
                Number(timeTracking.timeTrackingRemaining)
              }
              tooltipVisible
            />
            <div className="row">
              <div className="col-6 text-left font-weight-bold">
                {timeTracking.timeTrackingSpent}h logged
              </div>
              <div className="col-6 text-right font-weight-bold">
                {timeTracking.timeTrackingRemaining}h logged
              </div>
            </div>
            <div className="row" style={{ marginTop: 5 }}>
              <div className="col-6">
                <p>Time Spent</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingSpent"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingSpent: e.target.value,
                    });
                    setFieldValue("timeTrackingSpent", e.target.value);
                  }}
                />
              </div>
              <div className="col-6">
                <p>Time Remaining</p>
                <input
                  type="number"
                  defaultValue="0"
                  min="0"
                  className="form-control"
                  name="timeTrackingRemaining"
                  onChange={(e) => {
                    setTimeTracking({
                      ...timeTracking,
                      timeTrackingRemaining: e.target.value,
                    });
                    setFieldValue("timeTrackingRemaining", e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-group">
        <p>Description</p>
        <Editor
          name="description"
          initialValue=""
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
      </div>
      {/* <button type="submit">Submit</button> */}
    </form>
  );
}

const formCreateTask = withFormik({
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { arrStatus, arrProject, arrTaskType, arrPriority } = props;

    // if (arrProject.length > 0) {
    //   props.dispatch({
    //     type: GET_USER_BY_PROJECT_ID_SAGA,
    //     idProject: arrProject[0]?.id,
    //   });
    // }

    return {
      taskName: "",
      description: "string",
      statusId: arrStatus[0]?.statusId,
      originalEstimate: 0,
      timeTrackingSpent: 0,
      timeTrackingRemaining: 0,
      projectId: arrProject[0]?.id,
      typeId: arrTaskType[0]?.id,
      priorityId: arrPriority[0]?.priorityId,
      listUserAsign: [],
    };
  },
  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: "CREATE_TASK_SAGA",
      taskObject: values,
    });
  },
})(FormCreateTask);

const mapStateToProps = (state) => {
  return {
    arrProject: state.ProjectCyberbugsReducer.arrProject,
    arrTaskType: state.TaskTypeReducer.arrTaskType,
    arrPriority: state.PriorityReducer.arrPriority,
    arrStatus: state.StatusReducer.arrStatus,
  };
};

export default connect(mapStateToProps)(formCreateTask);
