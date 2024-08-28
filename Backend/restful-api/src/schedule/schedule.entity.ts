import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../user/user.entity';

@Entity()
export class Schedule {
  @PrimaryGeneratedColumn()
  @ApiProperty({ description: 'Unique identifier for the schedule' })
  id: number;

  @OneToOne(() => User, (user) => user.schedule, { cascade: true })
  @JoinColumn()
  @ApiProperty({ type: () => User, description: 'The user associated with this schedule' })
  user: User;

  @Column({ type: 'json' })
  @ApiProperty({
    description: 'Weekly availability of the user. Example: {"Monday": ["09:00-12:00", "14:00-17:00"], "Tuesday": ["09:00-12:00"]}',
  })
  availability: Record<string, string[]>;
}
