import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateMedicalHistoryDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the user associated with this medical history' })
  userId: number;
}
