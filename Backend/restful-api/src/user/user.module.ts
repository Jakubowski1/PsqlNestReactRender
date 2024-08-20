import { Module } from '@nestjs/common';
import { ControllerService } from './controller/controller.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  providers: [ControllerService, UserService],
  controllers: [UserController]
})
export class UserModule {}
