import { baseService } from "./baseService";

class CommentService extends baseService {
  getAllComment = (taskId) => {
    return this.get(`Comment/getAll?taskId=${taskId}`);
  };
  insertComment = (newComment) => {
    return this.post("Comment/insertComment", newComment);
  };
  updateComment = ({ id, contentComment }) => {
    return this.put(
      `Comment/updateComment?id=${id}&contentComment=${contentComment}`
    );
  };
  deleteComment = (idComment) => {
    return this.delete(`Comment/deleteComment?idComment=${idComment}`);
  };
}

export const commentService = new CommentService();
