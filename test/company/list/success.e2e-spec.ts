import { Test, TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { clearDatabase } from '../../test-utils';
import { AppModule } from '../../../src/app.module';

describe('/companies/list (GET) - список компаний', () => {
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

  it('Должен вернуть список компаний с пагинацией', async () => {
    await request(app.getHttpServer())
      .post('/companies/register')
      .send({
        name: 'Test Company',
        email: 'testcompany@example.com',
        password: 'password123',
      })
      await request(app.getHttpServer())
      .post('/companies/register')
      .send({
        name: 'Test Company 1',
        email: 'testcompany1@example.com',
        password: 'password123',
      })
      await request(app.getHttpServer())
      .post('/companies/register')
      .send({
        name: 'Test Company 2',
        email: 'testcompany2@example.com',
        password: 'password123',
      })
      .expect(201);
  
    const response = await request(app.getHttpServer())
      .get('/companies/list')
      .expect(200);

    expect(response.body).toMatchSnapshot();
  });
});