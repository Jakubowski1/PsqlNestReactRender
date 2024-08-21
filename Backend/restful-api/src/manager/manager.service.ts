import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';

@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Manager)
    private readonly managerRepository: Repository<Manager>,
  ) {}

  async create(createManagerDto: CreateManagerDto): Promise<Manager> {
    const manager = this.managerRepository.create(createManagerDto);
    return await this.managerRepository.save(manager);
  }

  async findAll(): Promise<Manager[]> {
    return await this.managerRepository.find();
  }

  async findOne(id: number): Promise<Manager> {
    const manager = await this.managerRepository.findOne({ where: { id } });
    if (!manager) {
      throw new NotFoundException(`Manager with ID ${id} not found`);
    }
    return manager;
  }

  async update(id: number, updateManagerDto: UpdateManagerDto): Promise<Manager> {
    const manager = await this.findOne(id);
    Object.assign(manager, updateManagerDto);
    return await this.managerRepository.save(manager);
  }

  async remove(id: number): Promise<void> {
    const manager = await this.findOne(id);
    await this.managerRepository.remove(manager);
  }
}
