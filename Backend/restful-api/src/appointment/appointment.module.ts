import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [AppointmentService,JwtService]
})
export class AppointmentModule {}
