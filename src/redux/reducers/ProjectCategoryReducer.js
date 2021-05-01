import { GET_ALL_PROJECT_CATEGORY } from "../constants/Cyberbugs/Cyberbugs";

const initialState = {
  arrProjectCategory: [],
};

export const ProjectCategoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_PROJECT_CATEGORY: {
      state.arrProjectCategory = action.data;
      return { ...state };
    }
    default:
      return state;
  }
};
