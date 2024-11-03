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

  it('Должен вернуть исключение - компания не найдена', async () => {
    const response = await request(app.getHttpServer())
      .get('/company/1')
      .expect(400);

    expect(response.body).toEqual({
      code: 'company-001',
      message: 'Company not found.',
    });
  });
});