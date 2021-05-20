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

  signup = (newUser) => {
    return this.post(`Users/signup`, newUser);
  };

  editUser = (editedUser) => {
    return this.put(`Users/editUser`, editedUser);
  };

  deleteUser = (id) => {
    return this.delete(`Users/deleteUser?id=${id}`);
  };
}

export const userService = new UserService();
