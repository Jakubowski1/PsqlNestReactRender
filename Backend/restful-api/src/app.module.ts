import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { DoctorModule } from './doctor/doctor.module';
import { ManagerModule } from './manager/manager.module';
import { PatientModule } from './patient/patient.module';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as cookieParser from 'cookie-parser';
import JwtCookieMiddleware from './auth/jwt-cookie.middleware';
import { ManagerService } from './manager/manager.service';
import { PatientService } from './patient/patient.service';
import { DoctorService } from './doctor/doctor.service';
import { AppointmentService } from './appointment/appointment.service';
import { ScheduleService } from './schedule/schedule.service';
import { UserService } from './user/user.service';

@Module({
  imports: [
    // Load environment variables globally
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  
    // Configure TypeORM to use DATABASE_URL from environment variables
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL, // Use DATABASE_URL from environment variables
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Adjust entity path according to your structure
        migrations: [__dirname + '/migrations/**/*.ts'], // Adjust migrations path if necessary
        synchronize: true, // Recommended to disable in production
        ssl: {
          rejectUnauthorized: false,
        }, // Optional: for SSL configuration, depending on your database setup
      }),
      inject: [ConfigService],
    }),

   ManagerModule

  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cookieParser(), JwtCookieMiddleware)
      .forRoutes('*');
  }
}
