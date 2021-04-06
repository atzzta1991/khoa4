import React, { Component } from "react";
import "./ToDoList.css";
import Axios from "axios";

export default class ToDoList extends Component {
  state = {
    taskList: [],
    values: { taskName: "" },
    errors: { taskName: "" },
  };
  getTaskList = () => {
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
      method: "GET",
    });

    promise.then((result) => {
      console.log(result.data);
      this.setState({
        taskList: result.data,
      });
      console.log("Success");
    });
    promise.catch((err) => {
      console.log(err.response.data);
      console.log("Failed");
    });
  };

  renderTaskToDo = () => {
    return this.state.taskList
      .filter((item) => !item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                onClick={() => {
                  this.delTask(item.taskName);
                }}
                className="remove"
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => this.checkTask(item.taskName)}
              >
                <i className="far fa-check-circle" />
                <i className="fas fa-check-circle" />
              </button>
            </div>
          </li>
        );
      });
  };

  renderTaskToDone = () => {
    return this.state.taskList
      .filter((item) => item.status)
      .map((item, index) => {
        return (
          <li key={index}>
            <span>{item.taskName}</span>
            <div className="buttons">
              <button
                className="remove"
                onClick={() => {
                  this.delTask(item.taskName);
                }}
              >
                <i className="fa fa-trash-alt" />
              </button>
              <button
                type="button"
                className="complete"
                onClick={() => this.rejectTask(item.taskName)}
              >
                <i className="far fa-undo" />
                <i className="fas fa-undo" />
              </button>
            </div>
          </li>
        );
      });
  };

  delTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });

    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  checkTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });

    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  rejectTask = (taskName) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      this.getTaskList();
    });

    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };

  componentDidMount() {
    this.getTaskList();
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    let newValues = { ...this.state.values };
    newValues = { ...newValues, [name]: value };
    let newErrors = { ...this.state.errors };
    let regexString = /^[a-z A-Z]+$/;
    if (!regexString.test(value) || value.trim() === "") {
      newErrors[name] = name + " invalid!";
    } else {
      newErrors[name] = "";
    }

    this.setState({ ...this.state, values: newValues, errors: newErrors });
  };

  addTask = (e) => {
    e.preventDefault();
    let promise = Axios({
      url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
      method: "POST",
      data: { taskName: this.state.values.taskName },
    });

    promise.then((result) => {
      //alert(result.data);
      this.getTaskList();
    });
    promise.catch((error) => {
      alert(error.response.data);
    });
  };
  render() {
    return (
      <form onSubmit={this.addTask}>
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
                    onChange={this.handleChange}
                  />
                  <button id="addItem" onClick={this.addTask}>
                    <i className="fa fa-plus" />
                  </button>
                </div>
                <p className="text text-danger">{this.state.errors.taskName}</p>
              </div>
              <div className="card__todo">
                <ul className="todo" id="todo">
                  {this.renderTaskToDo()}
                </ul>
                <ul className="todo" id="completed">
                  {this.renderTaskToDone()}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
