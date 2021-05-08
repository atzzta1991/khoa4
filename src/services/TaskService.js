import { baseService } from "./baseService";

class TaskService extends baseService {
  createTask = (taskObject) => {
    return this.post("Project/createTask", taskObject);
  };
}

export const taskService = new TaskService();
