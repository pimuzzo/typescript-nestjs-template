import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should save a user', () => {
    const dto: CreateUserDto = { name: 'Mario', email: 'mario@example.com' };
    const user = service.saveUser(dto);
    expect(user).toMatchObject(dto);
    expect(user.id).toBeDefined();
  });

  it('should get all users empty', () => {
    const all = service.getAllUsers();
    expect(all).toEqual([]);
  });
});
