import { Controller, Post, Body, Get, Param, ParseIntPipe, NotFoundException, Delete, Put } from '@nestjs/common';
import { AppointmentService } from './appointment.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { CreateAppointmentDto, UpdateAppointmentDto } from './dto/appointment.dto';
import { Appointment } from './appointment.entity';
import { User } from 'src/user/user.entity';
import { Role } from 'src/constants/roles.enum';

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

    // Fetch the doctor and user from the database to check their roles
    const doctor = await this.appointmentService.getUserById(doctorId);
    const user = await this.appointmentService.getUserById(userId);

    // Enforce doctor role
    if (doctor.role !== Role.Doctor) {
      throw new NotFoundException(`User with ID ${doctorId} is not a doctor`);
    }

    // Enforce patient role
    if (user.role !== Role.Patient) {
      throw new NotFoundException(`User with ID ${userId} is not a patient`);
    }

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

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an appointment by ID' })
  @ApiResponse({ status: 200, description: 'Appointment deleted successfully' })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  async deleteAppointment(@Param('id', ParseIntPipe) id: number): Promise<{ message: string }> {
    const appointment = await this.appointmentService.getAppointmentById(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    await this.appointmentService.deleteAppointment(id);
    return { message: `Appointment with ID ${id} deleted successfully` };
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an appointment by ID' })
  @ApiBody({ type: UpdateAppointmentDto })
  @ApiResponse({ status: 200, description: 'Appointment updated successfully', type: Appointment })
  @ApiResponse({ status: 404, description: 'Appointment not found' })
  async updateAppointment(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAppointmentDto: UpdateAppointmentDto
  ): Promise<Appointment> {
    const appointment = await this.appointmentService.getAppointmentById(id);
    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return await this.appointmentService.updateAppointment(id, updateAppointmentDto);
  }
}
