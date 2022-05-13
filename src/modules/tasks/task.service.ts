import { BadRequestException, Injectable } from '@nestjs/common';
import { Task } from '../../entities/task.entity';
import { User } from '../../entities/user.entity';

@Injectable()
export class TaskService {
  async getAllTasks(userId, conditions) {
    const [tasks, count] = await Task.findAndCount({
      where: { author_id: userId },
    });

    return { tasks, count };
  }

  async getTask(taskId: number) {
    const taskById = await Task.findOne(taskId);

    return taskById;
  }

  async createTask(taskData) {
    const userExists = await User.findOne(taskData.author_id);
    if (!userExists)
      throw new BadRequestException({
        type: 'Invalid data',
        message: 'Author not exists',
      });

    const task = new Task();
    task.author_id = taskData.author_id;
    task.title = taskData.title;
    task.description = taskData.description;

    await task.save();
    return 'Task created';
  }

  async updateTask(taskId: null, taskData) {
    return null;
  }
}
