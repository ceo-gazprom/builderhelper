import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Test Company', description: 'Название компании' })
  name: string;

  @ApiProperty({ example: 'test@example.com', description: 'Email компании' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль компании' })
  password: string;
}