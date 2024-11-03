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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { EmployeeService } from './employee.service';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeDto, EmployeeDto, GetEmployeeById } from './dtos';
import { EmployeeExceptionsFilter } from './exceptions';

@ApiTags('employees')
@UseFilters(EmployeeExceptionsFilter)
@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly employeeService: EmployeeService,
  ) {}

  @ApiOperation({ summary: 'Добвление сотрудника в компанию' })
  @ApiBody({ description: 'Employee data', type: CreateEmployeeDto })
  @ApiResponse({ status: 201, description: 'Сотрудник добавлен', type: Employee })
  @Post('create')
  public async create(@Body() createEmployeeDto: CreateEmployeeDto): Promise<any> {
    await this.employeeService.create(createEmployeeDto);
    return { status: 'success' }
  }


  @ApiOperation({ summary: 'Получить информацию о сотруднике по ID' })
  @ApiParam({ name: 'companyId', description: 'ID компании' })
  @ApiParam({ name: 'id', description: 'ID сотрудника' })
  @ApiResponse({ status: 200, description: 'Сотрудник найден', type: EmployeeDto })
  // todo: доделать ответы
  @ApiResponse({ status: 400, description: 'Сотрудник не найден' })
  @Get(':companyId/:id')
  public async getById(@Param() getEmployeeById: GetEmployeeById): Promise<any> {
    const employeeEntity = await this.employeeService.findByIdAndCompanyId(getEmployeeById);
    return new EmployeeDto(employeeEntity);
  }




  @ApiOperation({ summary: 'Get all employees' })
  @ApiResponse({ status: 200, description: 'List of all employees', type: [Employee] })
  @Get()
  async findAll(): Promise<Employee[]> {
    return this.employeeService.findAll();
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