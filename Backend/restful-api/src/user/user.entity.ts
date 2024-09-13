import { Entity, PrimaryGeneratedColumn, Column, TableInheritance, OneToMany,OneToOne,JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../constants/roles.enum';
import { Specialty } from '../constants/specialties.enum';
import { Appointment } from '../appointment/appointment.entity';
import { MedicalHistory } from '../medical-history/medical-history.entity';
import { Schedule } from '../schedule/schedule.entity';

@Entity()
export class User {

  

  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the user' })
  id: number;

  @Column()
  @ApiProperty({ description: 'Name of the user', nullable:true })
  name?: string;

  @Column()
  @ApiProperty({ description: 'Surname of the user', nullable:true })
  surname?: string;

  @Column({ unique: true })
  @ApiProperty({ description: 'Unique email address of the user' })
  email: string;

  @Column()
  @ApiProperty({ description: 'Password for the user account' })
  password: string;

  @Column({ default: Role.Patient })  
  role: Role;

  @Column({ nullable: true })
  @ApiProperty({ description: 'Age of a person', nullable: true })
  age?: string;
  
  @Column({ type: 'enum', enum: Specialty, nullable: true })
  @ApiProperty({ description: 'Medical specialty', nullable: true })
  specialty?: Specialty;
  
  @OneToOne(() => Schedule, (schedule) => schedule.user, { nullable: true })
  @ApiProperty({ type: () => Schedule, description: 'The schedule associated with this doctor', nullable: true })
  schedule?: Schedule;
  
  @OneToMany(() => Appointment, (appointment) => appointment.user, { cascade: true, nullable: true })
  @ApiProperty({ type: () => [Appointment], description: 'List of appointments associated with the user', nullable: true })
  appointments?: Appointment[];
  
  

  @Column({ default: false, nullable: true })
  @ApiProperty({ description: 'Indicates whether the patient is active', required: false })
  isActive?: boolean;



  @OneToOne(() => MedicalHistory, (medicalHistory) => medicalHistory.user, {  cascade: ['insert', 'update'] , nullable: true })
  @JoinColumn()
  @ApiProperty({ type: () => MedicalHistory, description: 'The medical history of the patient', required: false })
  medicalHistory?: MedicalHistory;
}
