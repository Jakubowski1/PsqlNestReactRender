import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '../doctor/doctor.entity';

@Entity()
export class Specialty {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the specialty' })
  id: number;

  @Column({ unique: true })
  @ApiProperty({ description: 'Name of the medical specialty' })
  name: string;

  @OneToMany(() => Doctor, (doctor) => doctor.specialty)
  @ApiProperty({ type: () => [Doctor], description: 'List of doctors that specialize in this specialty' })
  doctors: Doctor[];
}
