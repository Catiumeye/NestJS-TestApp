import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  async findOne(id) {
    return await User.findOne({ where: { id: id } });
  }

  async findAll(conditions) {
    return await User.findAndCount();
  }

  async createUser(userData) {
    const user = new User();
    return await user.save();
  }

  async updateUser(userData) {
    const user = new User();
    return await user.save();
  }
}
