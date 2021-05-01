import { USER_LOGIN } from "../../utils/constants/systemSettings";
import { US_LOGIN } from "../constants/Cyberbugs/Cyberbugs";

let usLogin = {};
if (localStorage.getItem(USER_LOGIN)) {
  usLogin = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const initialState = {
  userLogin: usLogin,
};

export const UserCyberbugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case US_LOGIN: {
      state.userLogin = action.userLogin;
      return { ...state };
    }
    default:
      return { ...state };
  }
};
