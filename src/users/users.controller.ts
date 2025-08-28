import { Body, Controller, Get, Post } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import type { User } from './entities/user.entity';

@ApiTags('User')
@Controller('/api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Create User' })
  @ApiCreatedResponse({ type: Object, description: 'User created' })
  createUser(@Body() dto: CreateUserDto): User {
    return this.usersService.saveUser(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get Users' })
  @ApiOkResponse({ type: Array, description: 'All users' })
  getUsers(): User[] {
    return this.usersService.getAllUsers();
  }
}
