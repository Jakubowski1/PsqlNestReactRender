import { Entity, OneToMany, Column, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Appointment } from '../appointment/appointment.entity';
import { MedicalHistory } from '../medical-history/medical-history.entity';

@Entity()
export class Patient extends User {
  @Column({ default: false })
  @ApiProperty({ description: 'Indicates whether the patient is active' })
  isActive: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.patient)
  @ApiProperty({ type: () => [Appointment], description: 'List of appointments associated with the patient' })
  appointments: Appointment[];

  @OneToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.patient, { cascade: true })
  @ApiProperty({ type: () => MedicalHistory, description: 'The medical history of the patient' })
  medicalHistory: MedicalHistory;
}
