import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('UsersModule (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }));
    await app.init();
  });

  it('/api/v1/users (POST) should create a user', async () => {
    const userDto = {
      name: 'Simone',
      email: 'simone@example.com',
    };

    const res = await request(app.getHttpServer())
      .post('/api/v1/users')
      .send(userDto)
      .expect(201);

    expect(res.body).toEqual({
      id: expect.any(Number),
      name: userDto.name,
      email: userDto.email,
    });
  });

  it('/api/v1/users (GET) should return all users', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/v1/users')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty('id');
    expect(res.body[0]).toHaveProperty('name');
    expect(res.body[0]).toHaveProperty('email');
  });

  afterAll(async () => {
    await app.close();
  });
});
