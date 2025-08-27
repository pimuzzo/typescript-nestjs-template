import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private fakeDb: User[] = [];

  saveUser(dto: CreateUserDto): User {
    const user: User = {
      id: this.fakeDb.length + 1,
      ...dto,
    };
    this.fakeDb.push(user);
    return user;
  }

  getAllUsers(): User[] {
    return this.fakeDb;
  }
}
