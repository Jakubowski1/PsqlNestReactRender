import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './user/user.entity';
import * as dotenv from 'dotenv';
import { Specialty } from './specialty/specialty.entity';
import { Doctor } from './doctor/doctor.entity';
import { Patient } from './patient/patient.entity';
import { Manager } from './manager/manager.entity';
import { Appointment } from './appointment/appointment.entity';
import { Schedule } from './schedule/schedule.entity';
dotenv.config(); 

const configService = new ConfigService();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: configService.get<string>('DATABASE_URL'),
  entities: [User, Manager, Patient, Doctor, Schedule, Appointment, Specialty,],
  migrations: [__dirname + '/migrations/**/*.ts'],
  synchronize: true,  // Recommended to keep this false in production
  ssl: {
    rejectUnauthorized: false,
  },

});
