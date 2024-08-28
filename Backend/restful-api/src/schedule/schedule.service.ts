import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';
import { User } from '../user/user.entity';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async createSchedule(user: User, availability: Record<string, string[]>): Promise<Schedule> {
    const schedule = this.scheduleRepository.create({ user, availability });
    return await this.scheduleRepository.save(schedule);
  }

  async updateSchedule(userId: number, availability: Record<string, string[]>): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({ where: { user: { id: userId } }, relations: ['user'] });
    if (!schedule) {
      throw new NotFoundException(`Schedule for user with ID ${userId} not found`);
    }
    schedule.availability = availability;
    return await this.scheduleRepository.save(schedule);
  }

  async getScheduleByUserId(userId: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({ where: { user: { id: userId } }, relations: ['user'] });
    if (!schedule) {
      throw new NotFoundException(`Schedule for user with ID ${userId} not found`);
    }
    return schedule;
  }

  async deleteSchedule(userId: number): Promise<void> {
    const result = await this.scheduleRepository.delete({ user: { id: userId } });
    if (result.affected === 0) {
      throw new NotFoundException(`Schedule for user with ID ${userId} not found`);
    }
  }
}
