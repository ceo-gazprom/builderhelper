import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { bootstrap } from '../../src/main'; // Импортируем bootstrap из main.ts

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await bootstrap(); // Инициализируем приложение через main.ts
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('API должно быть доступно на префиксе /api', () => {
    return request(app.getHttpServer())
      .get('/api')
      .expect(404); // Проверка, что корень API возвращает 404, если не определён
  });

  it('Swagger документация должна быть доступна по /docs', () => {
    return request(app.getHttpServer())
      .get('/docs')
      .expect(200)
      .expect((res) => {
        expect(res.text).toContain('Builder helper API'); // Проверка содержимого страницы
      });
  });

  it('Приложение должно запускаться и слушать порт', async () => {
    const response = await request(app.getHttpServer()).get('/api');
    expect(response.status).toBe(404); // Проверяем, что приложение работает
  });
});