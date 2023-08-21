import { PostRepository } from '../repositories';
class PostService {
  _postRepository = new PostRepository();
}

export default PostService;