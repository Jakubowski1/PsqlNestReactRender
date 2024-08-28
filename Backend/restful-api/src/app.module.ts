import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ScheduleModule } from './schedule/schedule.module';
import { AppointmentController } from './appointment/appointment.controller';
import { AppointmentModule } from './appointment/appointment.module';
import { MedicalHistoryModule } from './medical-history/medical-history.module';
import { Module, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as cookieParser from 'cookie-parser';
import JwtCookieMiddleware from './auth/jwt-cookie.middleware';
import { AppointmentService } from './appointment/appointment.service';
import { ScheduleService } from './schedule/schedule.service';
import { UserService } from './user/user.service';
import { Schedule } from './schedule/schedule.entity';
import { User } from './user/user.entity';
import { Appointment } from './appointment/appointment.entity';
import { MedicalHistory } from './medical-history/medical-history.entity';
import { Visit } from './visit/visit.entity';
import { VisitModule } from './visit/visit.module';

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
        entities: [Schedule, User,Appointment,MedicalHistory,Visit], // Adjust entity path according to your structure
        migrations: [__dirname + '/migrations/**/*.ts'], // Adjust migrations path if necessary
        synchronize: true, // Recommended to disable in production
        ssl: {
          rejectUnauthorized: false,
        }, // Optional: for SSL configuration, depending on your database setup
      }),
      inject: [ConfigService],
    }),

    AuthModule, UserModule, VisitModule, AppointmentModule,ScheduleModule,MedicalHistoryModule

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
