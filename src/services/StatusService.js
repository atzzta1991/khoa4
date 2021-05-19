import { baseService } from "./baseService";

class StatusService extends baseService {
  getAllStatus = () => {
    return this.get("Status/getAll");
  };
}

export const statusService = new StatusService();
