import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(dto: CreateUserDto): User {
    const user: User = {
      id: this.idCounter++,
      ...dto,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return this.users;
  }
}
