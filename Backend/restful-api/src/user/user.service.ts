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
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id }});
    if (user) {
    } else {
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.usersRepository.findOne({ where: { email } });
    if (user) {
    } else {
    }
    return user;
  }

  async create(user: User): Promise<User> {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    const newUser = this.usersRepository.create(user);
    const savedUser = await this.usersRepository.save(newUser);
    return savedUser;
  }

  async update(id: number, user: User): Promise<User> {
    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
    await this.usersRepository.update(id, user);
    const updatedUser = await this.usersRepository.findOne({ where: { id }, relations: ['posts'] });
    if (updatedUser) {
    } else {
    }
    return updatedUser;
  }

  async delete(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
  }
}
