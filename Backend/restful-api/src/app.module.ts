import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { LoggerModule } from './logger/logger.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';

@Module({
  imports: [AuthModule, UserModule, LoggerModule, ScheduleModule, AppointmentModule, MedicalHistoryModule],
  controllers: [AppController, AppointmentController],
  providers: [AppService],
})
export class AppModule {}
