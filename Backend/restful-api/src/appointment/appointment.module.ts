import { forwardRef, Module } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { JwtService } from '@nestjs/jwt';
import { AppointmentController } from './appointment.controller';
import { Appointment } from './appointment.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Appointment,User]),  forwardRef(() => UserModule),
  ],
  providers: [AppointmentService,JwtService],
  controllers: [AppointmentController],
  exports: [AppointmentService]
})
export class AppointmentModule {}
