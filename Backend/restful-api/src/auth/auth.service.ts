import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { WinstonLoggerService } from '../logger/logger.service';  

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
    private readonly logger: WinstonLoggerService,  
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    this.logger.log(`Validating user with email: ${email}`);
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      this.logger.warn(`Validation failed: User with email ${email} not found`);
      return null;
    }

    this.logger.log('Attempting password validation');
    try {
      const isPasswordValid = await bcrypt.compare(pass, user.password);
      this.logger.log(`Password validation result: ${isPasswordValid}`);

      if (isPasswordValid) {
        const { password, ...result } = user;
        this.logger.log(`Validation successful for user: ${email}`);
        return result;
      } else {
        this.logger.warn(`Validation failed: Incorrect password for user ${email}`);
        return null;
      }
    } catch (error) {
      this.logger.error(`Error during password validation for user ${email}`, error.stack || 'No stack trace available');
      return null;
    }
  }

  async login(user: any) {
    this.logger.log(`Logging in user: ${user.email}`);
    const payload = { email: user.email, id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    this.logger.log(`Generated JWT token for user: ${user.email}`);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(user: User): Promise<User> {
    this.logger.log(`Registering new user with surname: ${user.email}`);
    const newUser = await this.usersService.create({ ...user, password: user.password });
    this.logger.log(`Registered new user with ID: ${newUser.id}`);
    return newUser;
  }
}
