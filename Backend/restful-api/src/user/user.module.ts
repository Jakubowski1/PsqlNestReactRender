import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { AuthModule } from '../auth/auth.module';
import { JwtService } from '@nestjs/jwt';
import { WinstonLoggerService } from 'src/logger/logger.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    forwardRef(() => AuthModule),  
  ],
  providers: [UserService, JwtService,WinstonLoggerService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
