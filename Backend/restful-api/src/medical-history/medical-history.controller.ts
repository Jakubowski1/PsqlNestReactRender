import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { MedicalHistoryService } from './medical-history.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateMedicalHistoryDto } from './dto/create-medical-history.dto';
import { AddVisitDto } from './dto/add-visit.dto';
import { MedicalHistoryDto } from './dto/medical-history.dto';
import { UserService } from 'src/user/user.service';
import { Visit } from 'src/visit/visit.entity';
import { Appointment } from 'src/appointment/appointment.entity';

@ApiTags('Medical Histories')
@Controller('medical-histories')
export class MedicalHistoryController {
  constructor(
    private readonly medicalHistoryService: MedicalHistoryService,
    private readonly userService: UserService, 
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new medical history for a patient' })
  @ApiResponse({ status: 201, description: 'Medical history created successfully', type: MedicalHistoryDto })
  async createMedicalHistory(@Body() createMedicalHistoryDto: CreateMedicalHistoryDto): Promise<MedicalHistoryDto> {
    const user = await this.userService.findOne(createMedicalHistoryDto.userId); 
    const medicalHistory = await this.medicalHistoryService.createMedicalHistory(user);

    return {
      id: medicalHistory.id,
      user: medicalHistory.user,
      visits: medicalHistory.visits.map(visit => ({
        id: visit.id,
        appointment: visit.appointment,
        description: visit.description,
      })),
    };
  }

  @Post(':userId/visits')
  @ApiOperation({ summary: 'Add a visit to a patient\'s medical history' })
  @ApiResponse({ status: 200, description: 'Visit added successfully', type: MedicalHistoryDto })
  async addVisitToMedicalHistory(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() addVisitDto: AddVisitDto,
  ): Promise<MedicalHistoryDto> {
    const visit = new Visit();
    visit.description = addVisitDto.description;
    visit.appointment = { id: addVisitDto.appointmentId } as Appointment;

    const medicalHistory = await this.medicalHistoryService.addVisitToMedicalHistory(userId, visit);

    return {
      id: medicalHistory.id,
      user: medicalHistory.user,
      visits: medicalHistory.visits.map(visit => ({
        id: visit.id,
        appointment: visit.appointment,
        description: visit.description,
      })),
    };
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get a medical history by user ID' })
  @ApiResponse({ status: 200, description: 'Medical history retrieved successfully', type: MedicalHistoryDto })
  async getMedicalHistoryByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<MedicalHistoryDto> {
    const medicalHistory = await this.medicalHistoryService.getMedicalHistoryByUserId(userId);

    return {
      id: medicalHistory.id,
      user: medicalHistory.user,
      visits: medicalHistory.visits.map(visit => ({
        id: visit.id,
        appointment: visit.appointment,
        description: visit.description,
      })),
    };
  }
}
