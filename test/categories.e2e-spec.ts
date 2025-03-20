import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CategoryService } from '../src/categories/categories.service';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;
  let categoryServiceMock: Partial<CategoryService>;

  beforeAll(async () => {
    // Mock CategoryService
    categoryServiceMock = {
      create: jest.fn().mockResolvedValue({
        id: 1,
        title: 'Mock Category',
      }),
      findAll: jest.fn().mockResolvedValue([
        { id: 1, title: 'Mock Category' },
        { id: 2, title: 'Another Category' },
      ]),
      findByTitle: jest.fn().mockResolvedValue({
        id: 1,
        title: 'Mock Category',
      }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CategoryService)
      .useValue(categoryServiceMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/api/categories (POST) should create a category (mocked)', async () => {
    const res = await request(app.getHttpServer())
      .post('/api/categories')
      .send({
        title: 'Mock Category',
      });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('title', 'Mock Category');
  });

  it('/api/categories (GET) should return mocked categories', async () => {
    const res = await request(app.getHttpServer()).get('/api/categories');

    expect(res.status).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0]).toHaveProperty('title', 'Mock Category');
  });

  afterAll(async () => {
    await app.close();
  });
});
