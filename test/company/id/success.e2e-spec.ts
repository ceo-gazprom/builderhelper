import { Test, TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { clearDatabase } from '../../test-utils';
import { AppModule } from '../../../src/app.module';

describe('/company/:id (GET) - получить компанию по id', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    await clearDatabase(app.get(DataSource));
  });

  afterAll(async () => {
    await app.close();
  });

  it('Должен вернуть компанию с указанным id', async () => {
    await request(app.getHttpServer())
      .post('/company/register')
      .send({
        name: 'Test Company',
        email: 'testcompany@example.com',
        password: 'password123',
      })
  
    const response = await request(app.getHttpServer())
      .get('/company/1')
      .expect(200);

    expect(response.body).toEqual({
      email: "testcompany@example.com",
      id: 1,
      name: "Test Company",
      password: expect.any(String)
    });
  });
});