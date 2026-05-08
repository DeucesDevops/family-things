import { userRepository } from '../users/user.repository';

export const authRepository = {
  findUserByEmail: userRepository.findByEmail,
  createUser: userRepository.create,
};
