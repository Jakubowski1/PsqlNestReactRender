import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MedicalHistory } from './medical-history.entity';
import { User } from '../user/user.entity';
import { Visit } from '../visit/visit.entity';

@Injectable()
export class MedicalHistoryService {
  constructor(
    @InjectRepository(MedicalHistory)
    private readonly medicalHistoryRepository: Repository<MedicalHistory>,
    @InjectRepository(Visit)
    private readonly visitRepository: Repository<Visit>,
  ) {}

  async createMedicalHistory(user: User): Promise<MedicalHistory> {
    const medicalHistory = this.medicalHistoryRepository.create({ user });
    return await this.medicalHistoryRepository.save(medicalHistory);
  }

  async addVisitToMedicalHistory(userId: number, visit: Visit): Promise<MedicalHistory> {
    const medicalHistory = await this.medicalHistoryRepository.findOne({ where: { user: { id: userId } }, relations: ['visits'] });
    if (!medicalHistory) {
      throw new NotFoundException(`Medical history for user with ID ${userId} not found`);
    }

    visit.medicalHistory = medicalHistory;
    await this.visitRepository.save(visit);
    medicalHistory.visits.push(visit);

    return await this.medicalHistoryRepository.save(medicalHistory);
  }

  async getMedicalHistoryByUserId(userId: number): Promise<Partial<MedicalHistory>> {
    const medicalHistory = await this.medicalHistoryRepository.findOne({
      where: { user: { id: userId } },
      relations: ['visits', 'user'],
    });
    if (!medicalHistory) {
      throw new NotFoundException(`Medical history for user with ID ${userId} not found`);
    }

    // Manually remove circular references
    const serializedHistory = {
      ...medicalHistory,
      visits: medicalHistory.visits.map(visit => ({
        ...visit,
        medicalHistory: undefined, // Remove circular reference
      })),
    };

    return serializedHistory;
  }

}
