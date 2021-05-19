import { GET_ALL_COMMENTS } from "../constants/Cyberbugs/CommentConst";

const initialState = {
  lstComment: [],
};

export const CommentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_COMMENTS: {
      state.lstComment = action.allComments;
      return { ...state };
    }
    default:
      return state;
  }
};
