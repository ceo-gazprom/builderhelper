import { ApiProperty } from "@nestjs/swagger";
import type { Employee } from '../entities/employee.entity';

export class EmployeeDto {
  @ApiProperty({
    description: 'Id сотрудника',
    example: 1,
  })
  public id: number;

  @ApiProperty({
    description: 'Имя сотрудника',
    example: 'Иван',
  })
  public firstName: string;

  @ApiProperty({
    description: 'Фамилия сотрудника',
    example: 'Иванов'
  })
  public lastName: string;

  @ApiProperty({
    description: 'Id сотрудника',
    example: 'ivanov.ivan@mail.ru',
  })
  public email: string;

  constructor(entity: Employee) {
    this.id = entity.id;
    this.firstName = entity.firstName;
    this.lastName = entity.lastName;
    this.email = entity.email;
  }
}