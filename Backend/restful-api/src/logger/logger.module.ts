import { Module } from '@nestjs/common';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { WinstonLoggerService } from './logger.service';
import { WinstonModule } from 'nest-winston';


@Module({
  controllers: [UserController],
  providers: [UserService, WinstonLoggerService],
  exports: [WinstonModule],
  
})
export class UsersModule {}
