import { Entity, PrimaryGeneratedColumn, Column, TableInheritance } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/constants/roles.enum';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'role' } })
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Name of the user' })
  name: string;

  @Column()
  @ApiProperty({ description: 'Surname of the user' })
  surname: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Unique email address of the user' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Password for the user account' })
  password: string;

  @Column({ type: 'enum', enum: Role, default: Role.Patient })
  @ApiProperty({ description: 'Role of the user', enum: Role })
  role: Role;
}
