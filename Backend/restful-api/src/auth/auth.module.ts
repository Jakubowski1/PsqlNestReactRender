import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from '../guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { PatientService } from 'src/patient/patient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Patient } from 'src/patient/patient.entity';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
@Module({
  imports: [
    TypeOrmModule.forFeature([Patient,User]),

    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: "1h" },
      }),
    }),
    ConfigModule, 
  ],
  providers: [
    AuthService,PatientService,UserService,
    LocalStrategy,
    JwtStrategy,
    JwtService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    }
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
