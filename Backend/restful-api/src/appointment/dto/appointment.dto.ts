import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, IsDateString,IsOptional } from 'class-validator';

export class CreateAppointmentDto {
  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the doctor assigned to the appointment' })
  doctorId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty({ description: 'The ID of the user attending the appointment' })
  userId: number;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The scheduled time for the appointment' })
  appointmentTime: string;
}

export class UpdateAppointmentDto {
  @ApiProperty({ example: '2024-09-12T16:00:00.000Z', description: 'New time of the appointment (optional)', required: false })
  @IsOptional()
  @IsDateString()
  appointmentTime?: string;
}
