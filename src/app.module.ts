import { Module } from '@nestjs/common';
/**
 * Auth
 */
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
/**
 * Company
 */
import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company/entities/company.entity';
/**
 * Employee
 */
import { EmployeeService } from './employee/employee.service';
import { EmployeeController } from './employee/employee.controller';
import { Employee } from './employee/entities/employee.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'example',
      database: process.env.DATABASE_NAME || 'nestjs',
      autoLoadEntities: true,
      synchronize: true, // Не использовать в продакшене
    }),
    TypeOrmModule.forFeature([Company, Employee]),
  ],
  controllers: [AuthController, CompanyController, EmployeeController],
  providers: [AuthService, JwtStrategy, CompanyService, EmployeeService],
})
export class AppModule {}
