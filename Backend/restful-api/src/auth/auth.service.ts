import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcryptjs';
import { User } from '../user/user.entity';
import { RegisterDto } from './dto/register.dto';
import { PatientService } from 'src/patient/patient.service';
import { Patient } from 'src/patient/patient.entity';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly patientService: PatientService,

    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      return null;
    }

    try {
      const isPasswordValid = await bcrypt.compare(pass, user.password);

      if (isPasswordValid) {
        const { password, ...result } = user;
        return result;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  }

  async login(user: any) {
    const payload = { email: user.email, id: user.id, role: user.role };
    const token = this.jwtService.sign(payload);
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async register(registerDto: RegisterDto): Promise<Patient> {
    // Hash the password before saving

    // Create a new patient with the hashed password and inactive status
    const newPatient = await this.patientService.create({
      ...registerDto      
    });

    return newPatient;
  }
}

