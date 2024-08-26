import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john' })
  name: string;
  
  @ApiProperty({ example: 'doe' })
  surname: string;

  @ApiProperty({ example: 'jd@gmail.com' })
  email: string;

  @ApiProperty({ example: 'strong_password' })
  password: string;

}
