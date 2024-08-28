import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../constants/roles.enum';
import { Specialty } from '../../constants/specialties.enum';

export class CreateUserDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  surname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ enum: Role })
  role: Role;

  // Patient-specific fields
  @ApiProperty({ required: false })
  isActive?: boolean;

  // Doctor-specific fields
  @ApiProperty({ required: false })
  specialty?: Specialty;
}
