import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity';
import { Company } from '../company/entities/company.entity';
import { CreateEmployeeDto, GetEmployeeById } from './dtos';
import { EmployeeError, EmployeeErrorsEnum } from './exceptions';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,

    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  /**
   * Create
   *
   * @description Добавить нового сотрудника
   */
  public async create({
    firstName,
    lastName,
    email,
    companyId,
  }: CreateEmployeeDto): Promise<Employee> {
    const company = await this.companyRepository.findOne({ where: { id: companyId } });
    if (!company) {
      throw new EmployeeError(EmployeeErrorsEnum.CompanyNotFound);
    }

    const newEmployee = this.employeeRepository.create({
      firstName,
      lastName,
      email,
      password: 'none',
      company,
    });

    return this.employeeRepository.save(newEmployee);
  }

  public async findByIdAndCompanyId({
    id,
    companyId
  }: GetEmployeeById): Promise<Employee> {
    return this.employeeRepository.findOne({
      where: {
        id,
        company: {
          id: companyId,
        }
      }
    })
  }





  // Поиск сотрудника по email
  async findByEmail(email: string): Promise<Employee | undefined> {
    return this.employeeRepository.findOne({ where: { email }, relations: ['company'] });
  }

  // Получение списка всех сотрудников
  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['company'] });
  }

  // Получение информации о конкретном сотруднике
  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id }, relations: ['company'] });
    if (!employee) {
      throw new NotFoundException(`Сотрудник с ID ${id} не найден`);
    }
    return employee;
  }

  // Обновление информации о сотруднике
  async update(id: number, updateData: Partial<Employee>): Promise<Employee> {
    const employee = await this.findOne(id);
    Object.assign(employee, updateData);
    return this.employeeRepository.save(employee);
  }

  // Удаление сотрудника
  async remove(id: number): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
  }
}