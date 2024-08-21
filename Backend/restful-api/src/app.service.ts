import { Injectable, OnModuleInit } from '@nestjs/common';

import { UserService } from './user/user.service';
import { User } from './user/user.entity';
import { Role } from './constants/roles.enum';
@Injectable()
export class AppService implements OnModuleInit {
  constructor(

    private readonly usersService: UserService,
  ) {}

  async onModuleInit() {
    const user = new User();
    user.surname = 'admin';
    user.name = 'admin'
    user.email = 'admin'
    user.password = 'admin'; 
    user.role = Role.Manager;
   
    const createdUser = await this.usersService.create(user);



  }
  

  getHello(): string {
    return 'Hello World!';
  }
}
