import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Visit } from 'src/visit/visit.entity';

export class MedicalHistoryDto {
  @ApiProperty({ description: 'Unique identifier for the medical history' })
  id: number;

  @ApiProperty({ type: () => User, description: 'The user associated with this medical history' })
  user: User;

  @ApiProperty({ type: () => [Visit], description: 'Collection of visits associated with this medical history' })
  visits: Partial<Visit>[]; // Partial to omit circular reference
}
