import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { UpdateManagerDto } from './dto/update-manager.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../decorators/role.decorator';
import { Role } from 'src/constants/roles.enum';

@Controller('managers')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Manager)
  @Post()
  async create(@Body() createManagerDto: CreateManagerDto) {
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
