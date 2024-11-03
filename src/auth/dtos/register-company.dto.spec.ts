import { validate } from 'class-validator';
import { RegisterCompanyDto } from './register-company.dto';

describe('RegisterCompanyDto (unit)', () => {
  it('Должен успешно провалидировать данные', async () => {
    const dto = new RegisterCompanyDto();
    dto.name = 'Test Company';
    dto.email = 'test@example.com';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBe(0);
  });

  it('Должен сообщить, что имя компании пустое', async () => {
    const dto = new RegisterCompanyDto();
    dto.name = '';
    dto.email = 'test@example.com';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isNotEmpty).toBeDefined();
  });

  it('Должен сообщить, что email некорректный', async () => {
    const dto = new RegisterCompanyDto();
    dto.name = 'Test Company';
    dto.email = 'invalid-email';
    dto.password = 'password123';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.isEmail).toBeDefined();
  });

  it('Должен сообщить, что пароль короткий', async () => {
    const dto = new RegisterCompanyDto();
    dto.name = 'Test Company';
    dto.email = 'test@example.com';
    dto.password = 'short';

    const errors = await validate(dto);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].constraints?.minLength).toBeDefined();
  });
});