import { Injectable, OnModuleInit } from '@nestjs/common';
import { ManagerService } from './manager/manager.service';
import { Manager } from './manager/manager.entity';
import { Role } from './constants/roles.enum';
@Injectable()
export class AppService  {

  getHello(): string {
    return 'Hello World!';
  }
}
