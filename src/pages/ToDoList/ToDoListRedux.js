import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskApi,
  checkTaskApi,
  deleteTaskApi,
  getTaskListApi,
  rejectTaskApi,
} from "./../../redux/actions/ToDoListActions";

export default function ToDoListRedux(props) {
  const { taskList } = useSelector((state) => state.ToDoListReducers);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    taskList: [],
    values: { taskName: "" },
    errors: { taskName: "" },
  });
  const getTaskList = () => {
    dispatch(getTaskListApi());
  };

  const renderTaskToDo = () => {
    return taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                onClick={() => {
                  delTask(item.taskName);
                }}
                className="remove"
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => checkTask(item.taskName)}
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };
  const renderTaskToDone = () => {
    return taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                onClick={() => {
                  delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => rejectTask(item.taskName)}
              >
                <i className="far fa-undo" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };

  const delTask = (taskName) => {
    dispatch(deleteTaskApi(taskName));
  };

  const checkTask = (taskName) => {
    dispatch(checkTaskApi(taskName));
  };

  const rejectTask = (taskName) => {
    dispatch(rejectTaskApi(taskName));
  };

  useEffect(() => {
    getTaskList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValues = { ...state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...state.errors };
    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid!";
    } else {
      newErrors[name] = "";
    }

    setState({ ...state, values: newValues, errors: newErrors });
  };

  const addTask = (e) => {
    e.preventDefault();
    dispatch(addTaskApi(state.values.taskName));
  };
  return (
    <form onSubmit={addTask}>
      <div className="card">
        <div className="card__header">
          <img src={require("./bg.png").default} alt="bg" />
        </div>

        <div className="card__body">
          <div className="card__content">
            <div className="form-group">
              <div className="card__title">
                <h2>My Tasks</h2>
                <p>September 9 ,2020</p>
              </div>
              <div className="card__add">
                <input
                  name="taskName"
                  id="newTask"
                  type="text"
                  placeholder="Enter an activity..."
                  onChange={handleChange}
                />
                <button id="addItem" onClick={addTask}>
                  <i className="fa fa-plus" />
                </button>
              </div>
              <p className="text text-danger">{state.errors.taskName}</p>
            </div>
            <div className="card__todo">
              <ul className="todo" id="todo">
                {renderTaskToDo()}
              </ul>
              <ul className="todo" id="completed">
                {renderTaskToDone()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
