import { Entity, PrimaryGeneratedColumn, OneToOne, OneToMany, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';
import { Visit } from '../visit/visit.entity';
import { Exclude, Transform } from 'class-transformer';

@Entity()
export class MedicalHistory {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the medical history' })
  id: number;

  @OneToOne(() => User, (user) => user.medicalHistory)
  @JoinColumn()
  @ApiProperty({ type: () => User, description: 'The user associated with this medical history' })
  user: User;

  @OneToMany(() => Visit, (visit) => visit.medicalHistory, { cascade: true })
  @ApiProperty({ type: () => [Visit], description: 'Collection of visits associated with this medical history' })
  @Transform(({ value }) => value.map((visit: Visit) => ({ ...visit, medicalHistory: undefined })))
  visits: Visit[];
}
