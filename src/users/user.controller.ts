import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id) {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(@Query() conditions) {
    return this.userService.findAll(conditions);
  }

  @Post()
  createUser(@Body() userData) {
    return this.userService.createUser(userData);
  }

  @Put()
  updateUser(@Body() userData) {
    return this.userService.updateUser(userData);
  }
}
