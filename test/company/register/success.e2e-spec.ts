import { Test, TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { clearDatabase } from '../../test-utils';
import { AppModule } from '../../../src/app.module';

describe('/company/register (POST) - регистрация компании', () => {
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

  it('Должен зарегистрировать новую компанию', async () => {
    const { body } = await request(app.getHttpServer())
      .post('/company/register')
      .send({
        name: 'Test Company',
        email: 'testcompany@example.com',
        password: 'password123',
      })
      .expect(201);

    expect(body).toEqual({ status: 'success' });
  });
});