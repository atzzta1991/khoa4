import { GET_TASKS_API } from "../constants/ToDoListConstants";

const initialState = {
  taskList: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_API: {
      state.taskList = action.taskList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
