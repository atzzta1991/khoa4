import { baseService } from "./baseService";

export class ProjectService extends baseService {
  deleteProject = (id) => {
    this.delete(`Project/deleteProject?projectId=${id}`);
  };
}

export const projectService = new ProjectService();
