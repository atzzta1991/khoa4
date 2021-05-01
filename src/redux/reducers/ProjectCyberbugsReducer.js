const initialState = {
  projectList: [],
};

export const ProjectCyberbugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PROJECT_LIST": {
      state.projectList = action.projectList;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
