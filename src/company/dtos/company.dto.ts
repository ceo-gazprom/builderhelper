import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Уникальный идентификатор компании',
  })
  public id: number;

  @Column()
  @ApiProperty({
    example: 'Test Company',
    description: 'Название компании',
  })
  public name: string;

  @Column()
  @ApiProperty({
    example: 'test@example.com',
    description: 'Email компании',
  })
  public email: string;

  @Column()
  @ApiProperty({
    example: 'hashedpassword',
    description: 'Пароль компании (зашифрованный)',
  })
  public password: string;
}