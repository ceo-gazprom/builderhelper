import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseFilters,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { RegisterCompanyDto } from '../auth/dtos/register-company.dto';
import { CompanyExceptionsFilter } from './exceptions/company-exceptions.filter';
import { CompanyErrorsEnum } from './exceptions';

@ApiTags('Companies')
@Controller('company')
@UseFilters(CompanyExceptionsFilter)
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @ApiTags('auth')
  @Post('register')
  @ApiOperation({ summary: 'Регистрация новой компании' })
  @ApiResponse({ status: 200, description: 'Компания успешно создана' })
  @ApiResponse({
    status: 400,
    description: 'Некорректные данные',
    example: CompanyErrorsEnum,
  })
  public async register(
    @Body() createCompanyDto: RegisterCompanyDto
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