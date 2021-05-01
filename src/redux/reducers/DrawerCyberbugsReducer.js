import React from "react";

const initialState = {
  visible: false,
  ComponentContentDrawer: <h1>Hello drawer</h1>,
  callBackSubmit: () => alert("submit"),
};

export const DrawerCyberbugsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "OPEN_DRAWER": {
      state.visible = true;
      return { ...state };
    }
    case "CLOSE_DRAWER":
      state.visible = false;
      return { ...state };
    case "OPEN_FORM_EDIT_PROJECT": {
      state.visible = true;
      state.ComponentContentDrawer = action.Component;
      return { ...state };
    }
    case "SET_SUBMIT_EDIT_PROJECT": {
      state.callBackSubmit = action.submitForm;
      return { ...state };
    }
    default:
      return { ...state };
  }
};