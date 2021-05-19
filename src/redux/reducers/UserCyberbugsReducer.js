import { USER_LOGIN } from "../../utils/constants/systemSettings";
import { US_LOGIN } from "../constants/Cyberbugs/Cyberbugs";
import { GET_USER_BY_PROJECT_ID } from "../constants/Cyberbugs/UserConst";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: usLogin,
  userSearch: [],
  arrUser: [],
};

export const UserCyberbugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case US_LOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    case "GET_USER_SEARCH": {
      state.userSearch = action.lstUserSearch;
      return { ...state };
    }
    case GET_USER_BY_PROJECT_ID: {
      return { ...state, arrUser: action.arrUser };
    }
    default:
      return { ...state };
  }
};
