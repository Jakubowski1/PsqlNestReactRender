import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateVisitDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the appointment associated with this visit' })
  appointmentId: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'Description or notes of the visit' })
  description: string;
}
