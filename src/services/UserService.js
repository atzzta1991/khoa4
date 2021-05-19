import { baseService } from "./baseService";

class UserService extends baseService {
  getUsers = (keyword) => {
    return this.get(`Users/getUser?keyword=${keyword}`);
  };

  assignUserProject = (userProject) => {
    return this.post(`Project/assignUserProject`, userProject);
  };

  removeUserProject = (userProject) => {
    return this.post(`Project/removeUserFromProject`, userProject);
  };

  getUserByProjectId = (idProject) => {
    return this.get(`Users/getUserByProjectId?idProject=${idProject}`);
  };
}

export const userService = new UserService();
