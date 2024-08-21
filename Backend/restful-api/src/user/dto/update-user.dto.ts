import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../../constants/roles.enum';


export class UpdateUserDto {

@ApiProperty({ example: 'john', required: false  })
name?: string;

@ApiProperty({ example: 'doe', required: false  })
surname?: string;

@ApiProperty({ example: 'john_doe@gmail.com', required: false  })
email?: string;

@ApiProperty({ example: 'strong_password', required: false  })
password?: string;

@ApiProperty({ 
  example: Role.Patient, 
  enum: Role, 
  default: Role.Patient, 
  required: false 
})
role?: Role = Role.Patient;
}