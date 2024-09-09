import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment } from './appointment.entity';
import { User } from '../user/user.entity';
import { UpdateAppointmentDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
    
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,  // Inject the User repository to fetch users
  ) {}

  // Create a new appointment
  async createAppointment(doctor: User, user: User, appointmentTime: Date): Promise<Appointment> {
    // Fetch the doctor and user to validate roles
    const fetchedDoctor = await this.getUserById(doctor.id);
    const fetchedUser = await this.getUserById(user.id);

    // Check if the roles are correct
    if (fetchedDoctor.role !== 'doctor') {
      throw new NotFoundException(`User with ID ${doctor.id} is not a doctor`);
    }
    if (fetchedUser.role !== 'patient') {
      throw new NotFoundException(`User with ID ${user.id} is not a patient`);
    }

    // Create and save the appointment
    const appointment = this.appointmentRepository.create({ doctor: fetchedDoctor, user: fetchedUser, appointmentTime });
    return await this.appointmentRepository.save(appointment);
  }

  // Get an appointment by ID
  async getAppointmentById(id: number): Promise<Appointment> {
    const appointment = await this.appointmentRepository.findOne({ where: { id }, relations: ['doctor', 'user'] });
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  // Get all appointments
  async getAllAppointments(): Promise<Appointment[]> {
    return await this.appointmentRepository.find({ relations: ['doctor', 'user'] });
  }

  // Delete an appointment by ID
  async deleteAppointment(id: number): Promise<void> {
    const result = await this.appointmentRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
  }

  // Update an appointment by ID
  async updateAppointment(id: number, updateAppointmentDto: UpdateAppointmentDto): Promise<Appointment> {
    const appointment = await this.getAppointmentById(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    // Update the appointment properties
    Object.assign(appointment, updateAppointmentDto);
    return await this.appointmentRepository.save(appointment);
  }

  // Get user by ID
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }
}
