import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.usersRepository.find({ relations: ['appointments', 'medicalHistory', 'schedule'] });
  }

  async findOne(id: number): Promise<User> {
    return await this.usersRepository.findOne({ 
      where: { id },
      relations: ['appointments', 'medicalHistory', 'schedule']
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ 
      where: { email }
    });
  }

  async create(user: User): Promise<User> {
    
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = this.usersRepository.create(user);
    console.log(newUser);
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }

  async update(id: number, user: Partial<User>): Promise<User> {
    // Check if the password is being updated and hash it if so
    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
    
    await this.usersRepository.update(id, user);
    return await this.findOne(id);  // Return the updated user
  }

  async delete(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
