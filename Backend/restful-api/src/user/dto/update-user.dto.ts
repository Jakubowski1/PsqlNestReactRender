import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../constants/roles.enum';
import { Specialty } from '../../constants/specialties.enum';

export class UpdateUserDto {
  @ApiProperty({ required: false })
  name?: string;

  @ApiProperty({ required: false })
  surname?: string;

  @ApiProperty({ required: false })
  password?: string;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ enum: Role, required: false })
  role?: Role;

  // Patient-specific fields
  @ApiProperty({ required: false })
  isActive?: boolean;

  // Doctor-specific fields
  @ApiProperty({ required: false })
  specialty?: Specialty;
}
