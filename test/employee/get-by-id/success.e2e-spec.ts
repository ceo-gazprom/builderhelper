import { Test, TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DataSource } from 'typeorm';
import { clearDatabase } from '../../test-utils';
import { AppModule } from '../../../src/app.module';

describe('/employee/:companyId/:id (GET) - Получить данные сотрудника', () => {
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

  it('Должен вернуть данные сотрудникаа', async () => {
    await request(app.getHttpServer())
      .post('/company/register')
      .send({
        name: 'Test Company',
        email: 'testcompany@example.com',
        password: 'password123',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/employee/create')
      .send({
        companyId: 1,
        firstName: 'Иван',
        lastName: 'Иванов',
        email: 'ivanov.ivan@mail.ru',
      })
      .expect(201);
    
    const { body } = await request(app.getHttpServer())
      .get('/employee/1/1')
      .expect(200);
    expect(body).toEqual({
      id: 1,
      firstName: "Иван",
      lastName: "Иванов",
      email: "ivanov.ivan@mail.ru",
    });
  });
});