import {
  CHANGE_ASSIGNESS,
  CHANGE_TASK_MODAL,
  GET_TASK_DETAIL,
  REMOVE_USER_ASSIGN,
} from "../constants/Cyberbugs/TaskConst";

const initialState = {
  taskDetailModal: {
    alias: "task-a-1",
    assigness: [
      {
        alias: "khai-dep-trai",
        avatar: "https://ui-avatars.com/api/?name=khai dep trai",
        id: 90,
        name: "khai dep trai",
      },
    ],
    description: "<p>task a 1</p>",
    lstComment: [],
    originalEstimate: 5,
    priorityId: 0,
    priorityTask: { priorityId: 1, priority: "High" },
    projectId: 447,
    statusId: "1",
    taskId: 407,
    taskName: "task a 1",
    taskTypeDetail: { id: 1, taskType: "bug" },
    timeTrackingRemaining: 5,
    timeTrackingSpent: 5,
    typeId: 0,
  },
};

export const TaskReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_DETAIL: {
      return { ...state, taskDetailModal: action.taskDetailModal };
    }
    case CHANGE_TASK_MODAL: {
      const { name, value } = action;
      state.taskDetailModal = { ...state.taskDetailModal, [name]: value };
      return {
        ...state,
      };
    }
    case CHANGE_ASSIGNESS: {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness,
        action.userSelect,
      ];
      return { ...state };
    }

    case REMOVE_USER_ASSIGN: {
      state.taskDetailModal.assigness = [
        ...state.taskDetailModal.assigness.filter(
          (us) => us.id !== action.userId
        ),
      ];
      return { ...state };
    }
    default:
      return { ...state };
  }
};
