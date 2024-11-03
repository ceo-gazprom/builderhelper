import { validate } from 'class-validator';
import { LoginCompanyDto } from './login-company.dto';

describe('LoginCompanyDto (unit)', () => {
  it('Должен успешно провалидировать данные', async () => {
    const dto = new LoginCompanyDto();
    dto.email = 'test@example.com';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('Должен сообщить, что email некорректный', async () => {
    const dto = new LoginCompanyDto();
    dto.email = 'invalid-email';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isEmail).toBeDefined();
  });

  it('Должен сообщить, что email пуст', async () => {
    const dto = new LoginCompanyDto();
    dto.email = '';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBeDefined();
  });

  it('Должен сообщить, что пароль короткий', async () => {
    const dto = new LoginCompanyDto();
    dto.email = 'test@example.com';
    dto.password = 'short';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.minLength).toBeDefined();
  });
});