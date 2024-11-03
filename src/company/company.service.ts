import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import * as bcrypt from 'bcryptjs';
import type { RegisterCompanyDto } from '../auth/dtos/register-company.dto';
import { CompanyError, CompanyErrorsEnum } from './exceptions';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async register({ name, password, email }: RegisterCompanyDto): Promise<Company> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCompany = this.companyRepository.create({ name, email, password: hashedPassword });
    return this.companyRepository.save(newCompany);
  }

  public validateCompany(email, password) {
    return false;
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  public async findOne(id: number): Promise<Company> {
    const company = await this.companyRepository.findOne({ where: { id } });

    if (!company) {
      throw new CompanyError(CompanyErrorsEnum.NotFound);
    }

    return company;
  }

  /**
   * Find by email
   * 
   * @description Нахожит компанию в БД по email
   * @param email - email компании
   * @returns сущность Company
   */
  public async findByEmail(email: Company['email']): Promise<Company> {
    return this.companyRepository.findOne({ where: { email }});
  }
}