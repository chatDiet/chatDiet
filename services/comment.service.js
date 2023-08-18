import { CommentRepository } from '../repositories';

class CommentService {
  _commentRepository = new CommentRepository();
}

export default CommentService;
