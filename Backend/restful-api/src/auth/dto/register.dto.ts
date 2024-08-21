import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john_doe' })
  email: string;

  @ApiProperty({ example: 'strong_password' })
  password: string;

  @ApiProperty({ example: 'user', default: 'user' })
  role?: string = 'user';
}
