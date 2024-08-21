import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Patient } from '../patient/patient.entity';
import { Visit } from '../visit/visit.entity';

@Entity()
export class MedicalHistory {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the medical history' })
  id: number;

  @OneToOne(() => Patient, (patient) => patient.medicalHistory, { cascade: true })
  @JoinColumn()
  @ApiProperty({ type: () => Patient, description: 'The patient associated with this medical history' })
  patient: Patient;

  @OneToMany(() => Visit, (visit) => visit.appointment)
  @ApiProperty({ type: () => [Visit], description: 'List of visits recorded in this medical history' })
  visits: Visit[];
}
