import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseFilters,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto } from './dtos/create-employee.dto';
import { EmployeeExceptionsFilter } from './exceptions';

@ApiTags('employees')
@UseFilters(EmployeeExceptionsFilter)
@Controller('employees')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
  ) {}

  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'List of all employees', type: [Employee] })
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @ApiOperation({ summary: 'Добвление сотрудника в компанию' })
  @ApiBody({ description: 'Employee data', type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: 'Сотрудник добавлен', type: Employee })
  @Post()
  async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    return this.employeeService.create(createEmployeeDto);
  }








  @ApiOperation({ summary: 'Get an employee by ID' })
  @ApiParam({ name: 'id', description: 'Employee ID' })
  @ApiResponse({ status: 200, description: 'Employee found', type: Employee })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Employee> {
    const employee = await this.employeeService.findOne(id);
    if (!employee) {
      throw new NotFoundException('Employee not found');
    }
    return employee;
  }

  @ApiOperation({ summary: 'Update an existing employee' })
  @ApiParam({ name: 'id', description: 'Employee ID' })
  @ApiBody({ description: 'Updated employee data', type: Employee })
  @ApiResponse({ status: 200, description: 'Employee updated', type: Employee })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateEmployeeDto: Partial<Employee>): Promise<Employee> {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @ApiOperation({ summary: 'Delete an employee' })
  @ApiParam({ name: 'id', description: 'Employee ID' })
  @ApiResponse({ status: 200, description: 'Employee deleted' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    await this.employeeService.remove(id);
  }
}