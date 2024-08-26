import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [DoctorService,JwtService],
  controllers: [DoctorController]
})
export class DoctorModule {}
