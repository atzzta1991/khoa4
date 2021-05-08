import { baseService } from "./baseService";

class TaskTypeService extends baseService {
  getAllTaskType = () => {
    return this.get("TaskType/getAll");
  };
}

export const taskTypeService = new TaskTypeService();
