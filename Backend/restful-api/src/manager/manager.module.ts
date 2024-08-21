import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Manager } from './manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  providers: [ManagerService],
  controllers: [ManagerController],
})
export class ManagerModule {}
