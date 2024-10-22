import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 'John', description: 'First name of the employee' })
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the employee' })
  lastName: string;

  @ApiProperty({ example: 'john.doe@example.com', description: 'Email address of the employee' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Password for the employee' })
  password: string;

  @ApiProperty({ example: 1, description: 'ID of the company the employee belongs to' })
  companyId: number;
}