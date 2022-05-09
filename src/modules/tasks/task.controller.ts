import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { TaskService } from './task.service';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  getAllTasks(@Query() conditions) {
    return this.taskService.getAllTasks(conditions);
  }

  @Get(':userId')
  getTask(@Param('userId', ParseIntPipe) userId) {
    return this.taskService.getTask(userId);
  }

  @Post()
  createTask(@Body() taskData) {
    return this.taskService.createTask(taskData);
  }

  @Put(':taskId')
  updateTask(@Param('taskId', ParseIntPipe) taskId, @Body() taskData) {
    return this.taskService.updateTask(taskId, taskData);
  }
}
