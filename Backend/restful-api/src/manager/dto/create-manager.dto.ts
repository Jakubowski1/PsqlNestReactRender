import { IsString, IsNotEmpty, IsEmail, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/constants/roles.enum';

export class CreateManagerDto {
  @ApiProperty({ example: 'john' })
  name: string;

  @ApiProperty({ example: 'doe' })
  surname: string;

  @ApiProperty({ example: 'john_doe@gmail.com' })
  email: string;

  @ApiProperty({ example: 'strong_password' })
  password: string;

  @ApiProperty({ 
    example: Role.Manager, 
    enum: Role, 
    default: Role.Manager, 
    required: false 
  })
  role?: Role = Role.Manager;
}