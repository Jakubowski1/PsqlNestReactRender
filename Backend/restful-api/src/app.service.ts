import { Injectable, OnModuleInit } from '@nestjs/common';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';


import { Role } from './constants/roles.enum';
@Injectable()
export class AppService  {
  constructor(

    private readonly userService: UserService,
  ) {} 
  //  async onModuleInit() {
  //   const user = new User();
  //   user.email = "admin";
  //   user.password = 'admin'; 
  //   user.role = Role.Librarian;
  //   user.name = 'admin';
  //   user.surname = 'admin';
  //   const createdUser = await this.userService.create(user);
  // }
  getHello(): string {
    return 'Hello World!';
  }
}
