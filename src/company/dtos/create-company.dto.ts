import { ApiProperty } from '@nestjs/swagger';

export class CreateCompanyDto {
  @ApiProperty({ example: 'Test Company', description: 'Название компании' })
  public name: string;

  @ApiProperty({ example: 'test@example.com', description: 'Email компании' })
  public email: string;

  @ApiProperty({ example: 'password123', description: 'Пароль компании' })
  public password: string;
}