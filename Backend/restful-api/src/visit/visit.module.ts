import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Visit } from './visit.entity';
import { VisitService } from './visit.service';
import { VisitController } from './visit.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Visit]), // Register Visit entity/repository
  ],
  providers: [VisitService],
  controllers: [VisitController],
  exports: [VisitService], // Export the service if needed in other modules
})
export class VisitModule {}
