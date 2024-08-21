import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john_doe' })
  email: string;

  @ApiProperty({ example: 'strong_password' })
  password: string;
}
