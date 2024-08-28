import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { User } from '../user/user.entity';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {}

  async createAppointment(doctor: User, user: User, appointmentTime: Date): Promise<Appointment> {
    const appointment = this.appointmentRepository.create({ doctor, user, appointmentTime });
    return await this.appointmentRepository.save(appointment);
  }

  async getAppointmentById(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['doctor', 'user'] });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  async getAllAppointments(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({ relations: ['doctor', 'user'] });
  }
}
