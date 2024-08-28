import { Controller, Post, Body, Get, Param, ParseIntPipe, NotFoundException } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateAppointmentDto } from './dto/appointment.dto';
import { Appointment } from './appointment.entity';
import { User } from 'src/user/user.entity';

@ApiTags('Appointments')
@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new appointment' })
  @ApiBody({ type: CreateAppointmentDto })
  @ApiResponse({ status: 201, description: 'Appointment created successfully', type: Appointment })
  async createAppointment(@Body() createAppointmentDto: CreateAppointmentDto): Promise<Appointment> {
    const { doctorId, userId, appointmentTime } = createAppointmentDto;
    const appointment = await this.appointmentService.createAppointment(
      { id: doctorId } as User,
      { id: userId } as User,
      new Date(appointmentTime)
    );
    return appointment;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an appointment by ID' })
  @ApiResponse({ status: 200, description: 'Appointment retrieved successfully', type: Appointment })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  async getAppointmentById(@Param('id', ParseIntPipe) id: number): Promise<Appointment> {
    const appointment = await this.appointmentService.getAppointmentById(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }
    return appointment;
  }

  @Get()
  @ApiOperation({ summary: 'Get all appointments' })
  @ApiResponse({ status: 200, description: 'List of all appointments', type: [Appointment] })
  async getAllAppointments(): Promise<Appointment[]> {
    return await this.appointmentService.getAllAppointments();
  }
}
