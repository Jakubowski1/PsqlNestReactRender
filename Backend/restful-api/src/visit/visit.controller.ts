import { Controller, Post, Get, Body, Param, ParseIntPipe } from '@nestjs/common';
import { VisitService } from './visit.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Visit } from './visit.entity';
import { CreateVisitDto } from './dto/create-visit.dto';
import { Appointment } from 'src/appointment/appointment.entity';

@ApiTags('Visits')
@Controller('visits')
export class VisitController {
  constructor(private readonly visitService: VisitService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new visit' })
  @ApiResponse({ status: 201, description: 'Visit created successfully', type: Visit })
  async createVisit(@Body() createVisitDto: CreateVisitDto): Promise<Visit> {
    const { appointmentId, description } = createVisitDto;
    const appointment = { id: appointmentId } as Appointment; 
    return await this.visitService.createVisit(appointment, description);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a visit by ID' })
  @ApiResponse({ status: 200, description: 'Visit retrieved successfully', type: Visit })
  @ApiResponse({ status: 404, description: 'Visit not found' })
  async getVisitById(@Param('id', ParseIntPipe) id: number): Promise<Visit> {
    return await this.visitService.getVisitById(id);
  }

  @Get('appointment/:appointmentId')
  @ApiOperation({ summary: 'Get all visits by appointment ID' })
  @ApiResponse({ status: 200, description: 'Visits retrieved successfully', type: [Visit] })
  async getVisitsByAppointmentId(@Param('appointmentId', ParseIntPipe) appointmentId: number): Promise<Visit[]> {
    return await this.visitService.getVisitsByAppointmentId(appointmentId);
  }
}
