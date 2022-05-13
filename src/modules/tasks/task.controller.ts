import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskDto } from './task.dto';
import { TestExceptionFilter } from '../../filters/TestExceptionFilter';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get(':userId')
  getAllTasks(@Param('userId', ParseIntPipe) userId, @Query() conditions) {
    return this.taskService.getAllTasks(userId, conditions);
  }

  @Get(':taskId')
  getTask(@Param('taskId', ParseIntPipe) taskId) {
    return this.taskService.getTask(taskId);
  }

  @UseFilters(new TestExceptionFilter())
  @Post()
  createTask(@Body() taskData: Omit<TaskDto, 'status'>) {
    return this.taskService.createTask(taskData);
  }

  @Put(':taskId')
  updateTask(@Param('taskId', ParseIntPipe) taskId, @Body() taskData) {
    return this.taskService.updateTask(taskId, taskData);
  }
}
