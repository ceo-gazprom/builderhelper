import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseFilters,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dtos/create-company.dto';
import { CompanyExceptionsFilter } from './exceptions/company-exceptions.filter';

@ApiTags('auth')
@Controller('companies')
@UseFilters(CompanyExceptionsFilter)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('register')
  public async register(
    @Body() createCompanyDto: CreateCompanyDto
  ) {
    await this.companyService.register(createCompanyDto);

    return { status: 'success' };
  }

  @Get('list')
  public async list() {
    return this.companyService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }
}