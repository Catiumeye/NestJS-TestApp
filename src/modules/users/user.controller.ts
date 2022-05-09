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
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './user.dto';
import { TestExceptionFilter } from '../../filters/TestExceptionFilter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.userService.findOne(id);
  }

  @Get()
  findAll(@Query() conditions) {
    return this.userService.findAll(conditions);
  }

  @UseFilters(new TestExceptionFilter())
  @Post()
  createUser(@Body() userData: Omit<CreateUserDto, 'id'>) {
    return this.userService.createUser(userData);
  }

  @Put(':id')
  updateUser(@Param('id', ParseIntPipe) id, @Body() userData: CreateUserDto) {
    return this.userService.updateUser(userData);
  }
}
