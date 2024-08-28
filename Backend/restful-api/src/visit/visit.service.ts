import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Visit } from './visit.entity';
import { Appointment } from '../appointment/appointment.entity';

@Injectable()
export class VisitService {
  constructor(
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
  ) {}

  async createVisit(appointment: Appointment, description: string): Promise<Visit> {
    const visit = this.visitRepository.create({ appointment, description });
    return await this.visitRepository.save(visit);
  }

  async getVisitById(id: number): Promise<Visit> {
    const visit = await this.visitRepository.findOne({ where: { id }, relations: ['appointment'] });
    if (!visit) {
      throw new NotFoundException(`Visit with ID ${id} not found`);
    }
    return visit;
  }

  async getVisitsByAppointmentId(appointmentId: number): Promise<Visit[]> {
    return await this.visitRepository.find({
      where: { appointment: { id: appointmentId } },
      relations: ['appointment'],
    });
  }
}
