import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from 'src/app.module';
import { User } from 'src/users/entities/user.entity';

describe('UsersModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  it('/api/v1/users (POST) should create a user', async () => {
    const userDto = {
      name: 'Simone',
      email: 'simone@example.com',
    };

    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send(userDto)
      .expect(201);

    const user = res.body as User;
    expect(typeof user.id).toBe('number');
    expect(user.name).toBe(userDto.name);
    expect(user.email).toBe(userDto.email);
  });

  it('/api/v1/users (GET) should return all users', async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const res = await request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(200);

    const users = res.body as User[];
    expect(Array.isArray(users)).toBe(true);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });

  afterAll(async () => {
    await app.close();
  });
});
