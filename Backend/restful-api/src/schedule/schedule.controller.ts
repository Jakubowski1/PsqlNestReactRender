import { Controller, Post, Put, Get, Delete, Body, Param, ParseIntPipe } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Schedule } from './schedule.entity';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { User } from 'src/user/user.entity';

@ApiTags('Schedules')
@Controller('schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new schedule for a doctor' })
  @ApiResponse({ status: 201, description: 'Schedule created successfully', type: Schedule })
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto): Promise<Schedule> {
    const { userId, availability } = createScheduleDto;
    return await this.scheduleService.createSchedule({ id: userId } as User, availability);
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update an existing schedule' })
  @ApiResponse({ status: 200, description: 'Schedule updated successfully', type: Schedule })
  async updateSchedule(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() updateScheduleDto: UpdateScheduleDto,
  ): Promise<Schedule> {
    const { availability } = updateScheduleDto;
    return await this.scheduleService.updateSchedule(userId, availability);
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get a schedule by user ID' })
  @ApiResponse({ status: 200, description: 'Schedule retrieved successfully', type: Schedule })
  async getScheduleByUserId(@Param('userId', ParseIntPipe) userId: number): Promise<Schedule> {
    return await this.scheduleService.getScheduleByUserId(userId);
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete a schedule by user ID' })
  @ApiResponse({ status: 200, description: 'Schedule deleted successfully' })
  async deleteSchedule(@Param('userId', ParseIntPipe) userId: number): Promise<void> {
    return await this.scheduleService.deleteSchedule(userId);
  }
}
