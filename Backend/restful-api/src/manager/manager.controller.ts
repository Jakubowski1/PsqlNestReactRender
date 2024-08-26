import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from 'src/constants/roles.enum';
import { WinstonLoggerService } from 'src/logger/logger.service';
import { Manager } from './manager.entity';

@Controller('managers')
export class ManagerController {
  constructor(
    private readonly managerService: ManagerService,
    private readonly logger: WinstonLoggerService,
  ) {}



  @Post()
  @Roles(Role.Manager)
  @UseGuards(RolesGuard)
  @ApiOperation({ summary: 'Create a new manager' })
  @ApiBody({ type: CreateManagerDto })
  async create(@Body() createManagerDto: CreateManagerDto): Promise<Manager> {
    this.logger.log(`Creating a new manager: ${createManagerDto.name}`);
    return await this.managerService.create(createManagerDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return await this.managerService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.managerService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Manager)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateManagerDto: UpdateManagerDto) {
    return await this.managerService.update(id, updateManagerDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Manager)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return await this.managerService.remove(id);
  }
}
