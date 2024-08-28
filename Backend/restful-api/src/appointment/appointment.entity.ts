import { ApiProperty } from '@nestjs/swagger'; 
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier of the appointment' })  // Swagger description
  id: number;

  @ManyToOne(() => User)
  @ApiProperty({ type: () => User, description: 'The doctor assigned to the appointment' })  // Swagger description
  doctor: User;

  @ManyToOne(() => User, (user) => user.appointments)
  @ApiProperty({ type: () => User, description: 'The user attending the appointment' })  // Swagger description
  user: User;

  @Column({ type: 'timestamp' })
  @ApiProperty({ description: 'The scheduled time for the appointment' })  // Swagger description
  appointmentTime: Date;
}
