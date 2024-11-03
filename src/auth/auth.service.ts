import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { CompanyService } from '../company/company.service';
import { EmployeeService } from '../employee/employee.service';
import type { RegisterCompanyDto } from './dtos/register-company.dto';
import { Company } from '../company/entities/company.entity';
import type { LoginCompanyDto } from './dtos';
import { AuthError, AuthErrorsEnum } from './exceptions';

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
    async register({ name, email, password }: RegisterCompanyDto): Promise<Company> {

      const hashedPassword = await bcrypt.hash(password, 10);
      const newCompany = await this.companyService.register({
        name,
        email,
        password: hashedPassword,
      });
      return newCompany;
    }

  // Метод для генерации JWT токена
  public async loginCompany({ email, password }: LoginCompanyDto): Promise<{ accessToken: string }> {
    const company = await this.companyService.findByEmail(email);

    const passwordIsCorrect = await bcrypt.compare(password, company.password);

    if (!passwordIsCorrect) {
      throw new AuthError(AuthErrorsEnum.InvalidCredentials);
    }

    const payload = { email: company.email, sub: company.id };
    const accessToken = this.jwtService.sign(payload);
    return { accessToken };
  }  

  async registerCompany(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.companyService.register({
      name, email, password: hashedPassword });
  }

  async registerEmployee(firstName: string, lastName: string, email: string, password: string, companyId: number) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.employeeService.register(firstName, lastName, email, hashedPassword, companyId);
  }
}