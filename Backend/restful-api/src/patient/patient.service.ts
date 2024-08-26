import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Patient } from './patient.entity';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private readonly patientRepository: Repository<Patient>,
  ) {}

  async create(registerPatientDto: RegisterDto): Promise<Patient> {
    const patient = this.patientRepository.create(registerPatientDto);
    return await this.patientRepository.save(patient);
  }

  async findOneByEmail(email: string): Promise<Patient | undefined> {
    return await this.patientRepository.findOne({ where: { email } });
  }
}
