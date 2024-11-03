import { Test, TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { clearDatabase } from '../../test-utils';
import { AppModule } from '../../../src/app.module';

describe('/employee/create (POST) - Добавить работника в компанию', () => {
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

  it('Должен добавить работника', async () => {
    await request(app.getHttpServer())
      .post('/company/register')
      .send({
        name: 'Test Company',
        email: 'testcompany@example.com',
        password: 'password123',
      })
      .expect(201);

    const response = await request(app.getHttpServer())
      .post('/employee/create')
      .send({
        name: 'Test Company',
        email: 'testcompany@example.com',
        password: 'password123',
      })
      .expect(201);
    expect(response.body).toEqual({ status: 'success' });
  });
});