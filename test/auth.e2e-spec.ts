import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { AuthService } from '../src/auth/auth.service';
import { UsersService } from '../src/users/users.service';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let authServiceMock: Partial<AuthService>;
  let usersServiceMock: Partial<UsersService>;
  let accessToken: string;

  beforeAll(async () => {
    // Mock UsersService
    usersServiceMock = {
      findByEmail: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword123',
      }),
      create: jest.fn().mockResolvedValue({
        id: 1,
        email: 'test@example.com',
      }),
    };

    // Mock AuthService
    authServiceMock = {
      login: jest.fn().mockResolvedValue({ access_token: 'mocked_token' }),
      signUp: jest.fn().mockResolvedValue({ id: 1, email: 'test@example.com' }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UsersService)
      .useValue(usersServiceMock)
      .overrideProvider(AuthService)
      .useValue(authServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/signup (POST) should not save to DB but return mock data', async () => {
    const res = await request(app.getHttpServer()).post('/auth/signup').send({
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('email', 'test@example.com');
  });

  it('/auth/login (POST) should return a mocked JWT token', async () => {
    const res = await request(app.getHttpServer()).post('/auth/login').send({
      email: 'test@example.com',
      password: 'password123',
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('access_token', 'mocked_token');
    accessToken = res.body.access_token;
  });

  afterAll(async () => {
    await app.close();
  });
});
