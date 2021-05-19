import { baseService } from "./baseService";

class TaskService extends baseService {
  createTask = (taskObject) => {
    return this.post("Project/createTask", taskObject);
  };

  getTaskDetail = (taskId) => {
    return this.get(`Project/getTaskDetail?taskId=${taskId}`);
  };

  updateStatusTask = (taskUpdateStatus) => {
    return this.put("Project/updateStatus", taskUpdateStatus);
  };

  updateTask = (taskUpdate) => {
    return this.post("Project/updateTask", taskUpdate);
  };
}

export const taskService = new TaskService();
