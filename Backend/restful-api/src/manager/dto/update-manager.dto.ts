import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../constants/roles.enum';

export class UpdateManagerDto {
  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Name of the manager' })
  readonly name?: string;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional({ description: 'Surname of the manager' })
  readonly surname?: string;

  @IsOptional()
  @IsEmail()
  @ApiPropertyOptional({ description: 'Unique email address of the manager' })
  readonly email?: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @ApiPropertyOptional({ description: 'Password for the manager account' })
  readonly password?: string;

  @IsOptional()
  @ApiPropertyOptional({ description: 'Role of the manager', enum: Role })
  readonly role?: Role;
}
