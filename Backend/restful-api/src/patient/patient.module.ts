import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [PatientController],
  providers: [PatientService,JwtService],
  exports: [PatientService]
})
export class PatientModule {}
