import { ApiProperty } from '@nestjs/swagger'; 
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Doctor } from '../doctor/doctor.entity';
import { Patient } from '../patient/patient.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier of the appointment' })  // Swagger description
  id: number;

  @ManyToOne(() => Doctor)
  @ApiProperty({ type: () => Doctor, description: 'The doctor assigned to the appointment' })  // Swagger description
  doctor: Doctor;

  @ManyToOne(() => Patient, (patient) => patient.appointments)
  @ApiProperty({ type: () => Patient, description: 'The patient attending the appointment' })  // Swagger description
  patient: Patient;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'The scheduled time for the appointment' })  // Swagger description
  appointmentTime: Date;
}
