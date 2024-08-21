import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../appointment/appointment.entity';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the visit' })
  id: number;

  @ManyToOne(() => Appointment)
  @ApiProperty({ type: () => Appointment, description: 'The appointment associated with this visit' })
  appointment: Appointment;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'Description or notes of the visit' })
  description: string;
}
