import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { Manager } from './manager.entity';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager, User])],
  providers: [ManagerService, JwtService],
  controllers: [ManagerController],
  exports: [ManagerService],
})
export class ManagerModule {}
