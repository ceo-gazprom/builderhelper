import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsInt, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateEmployeeDto {
  @ApiProperty({
    example: 1,
    description: 'Id компании, за которой будет закреплен сотрудник',
  })
  @IsInt({ message: 'companyId должен быть целым числом' })
  @IsNotEmpty({ message: 'companyId обязателен' })
  public companyId: number;

  @ApiProperty({
    example: 'Иван',
    description: 'Имя сотрудника',
  })
  @IsString({ message: 'firstName должен быть строкой' })
  @IsNotEmpty({ message: 'firstName обязателен' })
  public firstName: string;

  @ApiProperty({
    example: 'Иванов',
    description: 'Фамилия сотрудника',
  })
  @IsString({ message: 'lastName должен быть строкой' })
  @IsNotEmpty({ message: 'lastName обязателен' })
  public lastName: string;

  @ApiProperty({
    example: 'ivanov.ivan@mail.ru',
    description: 'Адрес электронной почты сотрудника',
  })
  @IsEmail({}, { message: 'Неверный формат email' })
  @IsNotEmpty({ message: 'email обязателен' })
  public email: string;
}