import { Controller, Post, Body, UseGuards, Request,UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateCompanyDto } from '../company/dtos/create-company.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Регистрация компании' })
  @ApiResponse({ status: 201, description: 'Компания успешно зарегистрирована.' })
  @ApiResponse({ status: 400, description: 'Неверные данные.' })
  async register(@Body() createCompanyDto: CreateCompanyDto) {
    return this.authService.register(
      createCompanyDto.name,
      createCompanyDto.email,
      createCompanyDto.password,
    );
  }

  @Post('login')
  @ApiOperation({ summary: 'Аутентификация компании' })
  @ApiResponse({ status: 200, description: 'Токен успешно создан.' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные.' })
  async login(@Body() { email, password }: { email: string; password: string }) {
    const company = await this.authService.validateCompany(email, password);
    if (!company) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(company);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('profile')
  @ApiOperation({ summary: 'Получение профиля текущей компании' })
  @ApiResponse({ status: 200, description: 'Информация о компании.' })
  getProfile(@Request() req) {
    return req.user;
  }
}