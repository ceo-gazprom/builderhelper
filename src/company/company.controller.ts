import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';

@ApiTags('auth')
@Controller('companies')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('register')
  public async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    await this.companyService.register(name, email, password);

    return { status: 'success' };
  }

  @Get('list')
  public async list() {
    return this.companyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.companyService.findOne(id);
  }
}