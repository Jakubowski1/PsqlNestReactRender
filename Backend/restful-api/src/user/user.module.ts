import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { AppointmentModule } from 'src/appointment/appointment.module';
import { MedicalHistoryModule } from 'src/medical-history/medical-history.module';
import { ScheduleModule } from 'src/schedule/schedule.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),  
    forwardRef(() => AppointmentModule),     
               
    forwardRef(() => MedicalHistoryModule),     
    forwardRef(() => ScheduleModule),     
    
  ],
  providers: [UserService, JwtService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
