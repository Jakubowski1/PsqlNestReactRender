import { Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { JwtService } from '@nestjs/jwt';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment]), // Register Visit entity/repository
  ],
  providers: [AppointmentService,JwtService],
  controllers: [AppointmentController],
  exports: [AppointmentService]
})
export class AppointmentModule {}
