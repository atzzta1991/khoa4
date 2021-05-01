import { GET_TASKS_API } from "./../constants/ToDoListConstants";
import Axios from "axios";

export const getTaskListApi = () => {
  return async (dispatch) => {
    try {
      let { data, status } = await Axios({
        url: "http://svcy.myclass.vn/api/ToDoList/GetAllTask",
        method: "GET",
      });

      if (status === 200) {
        dispatch({ type: GET_TASKS_API, taskList: data });
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const addTaskApi = (taskName) => {
  return async (dispatch) => {
    try {
      let { status } = await Axios({
        url: "http://svcy.myclass.vn/api/ToDoList/AddTask",
        method: "POST",
        data: { taskName },
      });
      if (status === 200) {
        dispatch(getTaskListApi());
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
};

export const deleteTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/deleteTask?taskName=${taskName}`,
      method: "DELETE",
    });

    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });

    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};

export const checkTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/doneTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });

    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};

export const rejectTaskApi = (taskName) => {
  return (dispatch) => {
    let promise = Axios({
      url: `http://svcy.myclass.vn/api/ToDoList/rejectTask?taskName=${taskName}`,
      method: "PUT",
    });
    promise.then((result) => {
      alert(result.data);
      dispatch(getTaskListApi());
    });

    promise.catch((errors) => {
      alert(errors.response.data);
    });
  };
};
