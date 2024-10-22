import { Module } from '@nestjs/common';
/**
 * Auth
 */
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { JwtStrategy } from './auth/jwt.strategy';
/**
 * Company
 */
import { CompanyService } from './company/company.service';
import { CompanyController } from './company/company.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Company } from './company/entities/company.entity';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: 'your_secret_key',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true, // Не использовать в продакшене
    }),
    TypeOrmModule.forFeature([Company]),
  ],
  controllers: [CompanyController],
  providers: [AuthService, JwtStrategy, CompanyService],
})
export class AppModule {}
