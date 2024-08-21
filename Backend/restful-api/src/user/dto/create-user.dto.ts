import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../constants/roles.enum';


export class CreateUserDto {
  @ApiProperty({ example: 'john' })
  name: string;

  @ApiProperty({ example: 'doe' })
  surname: string;

  @ApiProperty({ example: 'john_doe@gmail.com' })
  email: string;

  @ApiProperty({ example: 'strong_password' })
  password: string;

  @ApiProperty({ 
    example: Role.Patient, 
    enum: Role, 
    default: Role.Patient, 
    required: false 
  })
  role?: Role = Role.Patient;
}
