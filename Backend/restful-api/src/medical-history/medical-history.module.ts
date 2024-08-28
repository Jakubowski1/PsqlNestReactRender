import { Module } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { MedicalHistoryController } from './medical-history.controller';
import { JwtService } from '@nestjs/jwt';
import { MedicalHistory } from './medical-history.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from 'src/visit/visit.entity';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MedicalHistory,Visit]), UserModule
  ],
  providers: [MedicalHistoryService,JwtService],
  controllers: [MedicalHistoryController],
  exports: [MedicalHistoryService]
})
export class MedicalHistoryModule {}
