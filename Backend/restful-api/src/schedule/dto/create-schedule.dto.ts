import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsObject } from 'class-validator';

export class CreateScheduleDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the user (doctor) associated with this schedule' })
  userId: number;

  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Weekly availability of the user. Example: {"Monday": ["09:00-12:00", "14:00-17:00"], "Tuesday": ["09:00-12:00"]}',
  })
  availability: Record<string, string[]>;
}
