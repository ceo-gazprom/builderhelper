import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Company } from '../../company/entities/company.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @ManyToOne(() => Company, company => company.employees)
  public company: Company;
}