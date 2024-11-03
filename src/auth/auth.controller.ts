import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginCompanyDto, RegisterCompanyDto } from './dtos';
import { AuthExceptionsFilter } from './exceptions';


@ApiTags('auth')
@Controller('auth')
@UseFilters(AuthExceptionsFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  // @Post('company/register')
  // @ApiOperation({ summary: 'Регистрация компании' })
  // @ApiResponse({ status: 201, description: 'Компания успешно зарегистрирована.' })
  // @ApiResponse({ status: 400, description: 'Неверные данные.' })
  // public async register(@Body() registerCompanyDto: RegisterCompanyDto) {
  //   return this.authService.register(registerCompanyDto);
  // }

  // @Post('company/login')
  // @ApiOperation({ summary: 'Аутентификация компании' })
  // @ApiResponse({ status: 200, description: 'Токен успешно создан.' })
  // @ApiResponse({ status: 401, description: 'Неверные учетные данные.' })
  // async login(@Body() loginCompanyDto: LoginCompanyDto) {
  //   return this.authService.loginCompany(loginCompanyDto);
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('profile')
  // @ApiOperation({ summary: 'Получение профиля текущей компании' })
  // @ApiResponse({ status: 200, description: 'Информация о компании.' })
  // getProfile(@Request() req) {
  //   return req.user;
  // }
}