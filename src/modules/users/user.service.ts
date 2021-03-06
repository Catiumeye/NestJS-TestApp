import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { hash } from 'bcryptjs';
import { Task } from '../../entities/task.entity';
import { createQueryBuilder, getRepository } from 'typeorm';

@Injectable()
export class UserService {
  async findOne(id) {
    return await User.findOne({ where: { id: id } });
  }

  async findAll(conditions) {
    const [users, count] = await createQueryBuilder(User, 'u')
      .leftJoinAndSelect('u.tasks', 't')
      .select([
        'u.alias',
        'u.email',
        't.id',
        't.title',
        't.description',
        't.status',
        't.created_at',
        't.updated_at',
      ])
      .getManyAndCount();

    return { users, count };
  }

  async createUser({ alias, email, password }) {
    const coincidence = await this.checkExistsUser({ alias, email });
    if (coincidence) throw new BadRequestException(coincidence);

    const user = new User();
    user.alias = alias;
    user.email = email;
    user.passwordHash = await hash(password, 10);

    return await user.save();
  }

  async updateUser(userData) {
    const user = new User();
    return await user.save();
  }

  async checkExistsUser(objFields) {
    const conditions = [];
    const error = { type: 'unique', fields: {} };
    const arrayOfField = Object.entries(objFields);

    arrayOfField.forEach(([key, value]) => {
      const intermediateObj = {};
      intermediateObj[key] = value;
      conditions.push(intermediateObj);
    });

    const coincidence = await User.find({
      where: conditions,
    });
    if (!coincidence.length) return null;

    const [destructedCoincidence] = coincidence;
    arrayOfField.forEach(([key, value]) => {
      if (
        destructedCoincidence[key].toLowerCase() === `${value}`.toLowerCase()
      ) {
        error.fields[key] = value;
      }
    });
    return error;
  }
}
