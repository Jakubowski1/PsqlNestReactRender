import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [MedicalHistoryService,JwtService],
  controllers: [MedicalHistoryController]
})
export class MedicalHistoryModule {}
