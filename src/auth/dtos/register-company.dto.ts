import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterCompanyDto {
  @ApiProperty({
    example: 'Test Company',
    description: 'Название компании',
  })
  @IsString()
  @IsNotEmpty({ message: 'Название компании обязательно' })
  public name: string;

  @ApiProperty({
    example: 'test@example.com',
    description: 'Email компании',
  })
  @IsEmail({}, { message: 'Неверный формат email' })
  @IsNotEmpty({ message: 'Email компании обязателен' })
  public email: string;

  @ApiProperty({
    example: 'password123',
    description: 'Пароль компании',
  })
  @IsString()
  @MinLength(8, { message: 'Пароль должен быть не менее 8 символов' })
  public password: string;
}