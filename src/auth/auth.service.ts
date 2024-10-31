import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CompanyService } from '../company/company.service';
import { EmployeeService } from '../employee/employee.service';
import { CreateCompanyDto } from '../company/dtos/create-company.dto';
import { Company } from '../company/entities/company.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly employeeService: EmployeeService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string, isCompany: boolean): Promise<any> {
    const user = isCompany
      ? await this.companyService.findByEmail(email)
      : await this.employeeService.findByEmail(email);

    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

    // Метод для регистрации компании
    async register(createCompanyDto: CreateCompanyDto): Promise<Company> {
      const { name, email, password } = createCompanyDto;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newCompany = await this.companyService.register(
        name,
        email,
        hashedPassword,
      );
      return newCompany;
    }

  // Метод для генерации JWT токена
  async login(company: Company): Promise<{ accessToken: string }> {
    const payload = { email: company.email, sub: company.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }  

  async registerCompany(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.companyService.register(name, email, hashedPassword);
  }

  async registerEmployee(firstName: string, lastName: string, email: string, password: string, companyId: number) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.employeeService.register(firstName, lastName, email, hashedPassword, companyId);
  }
}