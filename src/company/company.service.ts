import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Company } from './entities/company.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private companyRepository: Repository<Company>,
  ) {}

  async register(name: string, email: string, password: string): Promise<Company> {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newCompany = this.companyRepository.create({ name, email, password: hashedPassword });
    return this.companyRepository.save(newCompany);
  }

  async findByEmail(email: string): Promise<Company | undefined> {
    return this.companyRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<Company[]> {
    return this.companyRepository.find();
  }

  async findOne(id: number): Promise<Company> {
    return this.companyRepository.findOne({ where: { id } });
  }
}