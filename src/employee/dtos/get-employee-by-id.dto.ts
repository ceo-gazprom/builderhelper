import { ApiProperty } from '@nestjs/swagger';
import { IsInt } from 'class-validator';

export class GetEmployeeById {
  @ApiProperty({
    description: 'Id сотрудника',
    example: 1,
  })
  @IsInt()
  public id: number;

  @ApiProperty({ 
    description: 'Id компании к которой закреплен сотрудник',
    example: 1,
  })
  @IsInt()
  public companyId: number;
}