import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор компании' })
  id: number;

  @Column()
  @ApiProperty({ example: 'Test Company', description: 'Название компании' })
  name: string;

  @Column()
  @ApiProperty({ example: 'test@example.com', description: 'Email компании' })
  email: string;

  @Column()
  @ApiProperty({ example: 'hashedpassword', description: 'Пароль компании (зашифрованный)' })
  password: string;
}