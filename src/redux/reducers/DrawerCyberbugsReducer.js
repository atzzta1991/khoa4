import React from "react";

const initialState = {
  visible: false,
  title: "",
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
      state.title = action.title;
      state.ComponentContentDrawer = action.Component;
      return { ...state };
    }
    case "SET_SUBMIT_EDIT_PROJECT": {
      state.callBackSubmit = action.submitForm;
      return { ...state };
    }
    case "OPEN_FORM_CREATE_TASK": {
      state.visible = true;
      state.title = action.title;
      state.ComponentContentDrawer = action.Component;
      return { ...state };
    }
    case "SET_SUBMIT_CREATE_TASK": {
      return { ...state, callBackSubmit: action.submitForm };
    }

    case "OPEN_FORM_CREATE_USER": {
      state.visible = true;
      state.title = action.title;
      state.ComponentContentDrawer = action.Component;
      return { ...state };
    }
    case "OPEN_FORM_EDIT_USER": {
      state.visible = true;
      state.title = action.title;
      state.ComponentContentDrawer = action.Component;
      return { ...state };
    }
    case "SET_SUBMIT_CREATE_USER": {
      return { ...state, callBackSubmit: action.submitForm };
    }
    case "SET_SUBMIT_EDIT_USER": {
      return { ...state, callBackSubmit: action.submitForm };
    }
    default:
      return { ...state };
  }
};
