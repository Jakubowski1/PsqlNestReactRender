import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne } from 'typeorm';
import { User } from '../user/user.entity';
import { Specialty } from '../constants/specialties.enum';
import { Schedule } from '../schedule/schedule.entity';

@Entity()
export class Doctor extends User {
    @PrimaryGeneratedColumn()

    @ApiProperty({ description: 'Unique identifier for the doctor' })
    id: number;

    @ApiProperty({ example: 'John', description: 'The name of the doctor' })
    @Column()
    name: string;

    @ApiProperty({ example: 'Doe', description: 'The surname of the doctor' })
    @Column()
    surname: string;

    @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the doctor' })
    @Column({ unique: true })
    email: string;

     @Column({ type: 'enum', enum: Specialty })
    @ApiProperty({ description: 'Specialty of the doctor', enum: Specialty })
    specialty: Specialty;

    @OneToOne(() => Schedule, (schedule) => schedule.doctor)
    @ApiProperty({ type: () => Schedule, description: 'The schedule associated with this doctor' })
    schedule: Schedule;
}


