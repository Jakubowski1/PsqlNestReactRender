import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject } from 'class-validator';

export class UpdateScheduleDto {
  @IsObject()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Updated weekly availability of the user. Example: {"Monday": ["09:00-12:00", "14:00-17:00"], "Tuesday": ["09:00-12:00"]}',
  })
  availability: Record<string, string[]>;
}
