import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Manager } from './manager.entity';
import * as bcrypt from 'bcryptjs';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { Role } from '../constants/roles.enum';

@Injectable()
export class ManagerService {
  // constructor(
  //   @InjectRepository(Manager)
  //   private readonly managerRepository: Repository<Manager>,

  // ) {}
 
  // async onModuleInit() {
  //   const adminEmail = 'admin@example.com'; // Use a more specific admin email

  //   // Check if the admin user already exists
  //   const existingAdmin = await this.managerRepository.findOne({ where: { email: adminEmail } });

  //   if (!existingAdmin) {

  //     const createManagerDto: CreateManagerDto = {
  //       name: 'admin',
  //       surname: 'admin',
  //       email: adminEmail,
  //       password: 'admin', // Consider using environment variables for sensitive data
  //       role: Role.Manager,
  //     };

  //     await this.create(createManagerDto);
  //   } 
  // }


  // async create(createManagerDto: CreateManagerDto): Promise<Manager> {
  //   const salt = await bcrypt.genSalt();
  //   const hashedPassword = await bcrypt.hash(createManagerDto.password, salt);

  //   const newManager = this.managerRepository.create({
  //     ...createManagerDto,
  //     password: hashedPassword,
  //   });

  //   const savedManager = await this.managerRepository.save(newManager);
  //   return savedManager;
  // }
  // async findAll(): Promise<Manager[]> {
  //   return await this.managerRepository.find();
  // }

  // async findOne(id: number): Promise<Manager> {
  //   const manager = await this.managerRepository.findOne({ where: { id } });
  //   if (!manager) {
  //     throw new NotFoundException(`Manager with ID ${id} not found`);
  //   }
  //   return manager;
  // }

  // async update(id: number, updateManagerDto: UpdateManagerDto): Promise<Manager> {
  //   const manager = await this.findOne(id);
  //   Object.assign(manager, updateManagerDto);
  //   return await this.managerRepository.save(manager);
  // }

  // async remove(id: number): Promise<void> {
  //   const manager = await this.findOne(id);
  //   await this.managerRepository.remove(manager);
  // }
}
