import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from '../doctor/doctor.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the schedule' })
  id: number;

  @OneToOne(() => Doctor, (doctor) => doctor.schedule, { cascade: true })
  @JoinColumn()
  @ApiProperty({ type: () => Doctor, description: 'The doctor associated with this schedule' })
  doctor: Doctor;

  @Column({ type: 'json' })
  @ApiProperty({
    description: 'Weekly availability of the doctor. Example: {"Monday": ["09:00-12:00", "14:00-17:00"], "Tuesday": ["09:00-12:00"]}',
  })
  availability: Record<string, string[]>;
}
