import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CompanyService } from '../company/company.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly companyService: CompanyService,
    private readonly jwtService: JwtService,
  ) {}

  async validateCompany(email: string, pass: string): Promise<any> {
    const company = await this.companyService.findByEmail(email);
    if (company && (await bcrypt.compare(pass, company.password))) {
      const { password, ...result } = company;
      return result;
    }
    return null;
  }

  async login(company: any) {
    const payload = { name: company.name, sub: company.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(name: string, email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.companyService.register(name, email, hashedPassword);
  }
}