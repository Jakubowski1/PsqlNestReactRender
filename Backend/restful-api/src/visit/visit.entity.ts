import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Appointment } from '../appointment/appointment.entity';
import { MedicalHistory } from '../medical-history/medical-history.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Visit {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the visit' })
  id: number;

  @ManyToOne(() => Appointment)
  @ApiProperty({ type: () => Appointment, description: 'The appointment associated with this visit' })
  appointment: Appointment;

  @ManyToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.visits)
  @Exclude() 
  @ApiProperty({ type: () => MedicalHistory, description: 'The medical history associated with this visit' })
  medicalHistory: MedicalHistory;

  @Column({ type: 'text' })
  @ApiProperty({ description: 'Description or notes of the visit' })
  description: string;
}
