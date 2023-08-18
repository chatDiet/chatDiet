import { UserRepository } from '../repositories';
class UserService {
  _userRepository = new UserRepository();
}

export default UserService;
