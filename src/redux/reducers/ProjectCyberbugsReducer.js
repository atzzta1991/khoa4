import { GET_ALL_PROJECT } from "../constants/Cyberbugs/ProjectConst";

const initialState = {
  projectList: [],
  arrProject: [],
};

export const ProjectCyberbugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECT_LIST": {
      state.projectList = action.projectList;
      return { ...state };
    }
    case GET_ALL_PROJECT: {
      return { ...state, arrProject: action.arrProject };
    }
    default:
      return { ...state };
  }
};
