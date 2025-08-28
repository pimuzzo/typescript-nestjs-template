import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from "./entities/user.entity";

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private fakeDb: User[] = [];

  saveUser(dto: CreateUserDto): User {
    this.logger.debug('Creating user');
    const user: User = {
      id: this.fakeDb.length + 1,
      ...dto,
    };
    this.fakeDb.push(user);
    this.logger.log('User created');
    return user;
  }

  getAllUsers(): User[] {
    this.logger.debug('Reading all users');
    return this.fakeDb;
  }
}
