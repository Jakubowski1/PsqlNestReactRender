import { Controller,Get, Post,Body,Param,Delete,Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserEntity } from './user.entity';

import {ApiTags,ApiOperation,ApiParam,ApiBody,ApiBearerAuth,} from '@nestjs/swagger';

  import { RolesGuard } from '../guards/roles.guard';
  import { Roles } from '../decorators/role.decorator';
  import { CreateUserDto } from './dto/create-user.dto';
  import { UpdateUserDto } from './dto/update-user.dto';
  import { WinstonLoggerService } from '../logger/logger.service';
  import { UserNotFoundException } from '../exceptions/custom-exceptions';  
  @ApiTags('users')
  @Controller('users')
  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  export class UserController {
    constructor(
      private readonly usersService: UserService,
      private readonly logger: WinstonLoggerService,
    ) {}
  
    @Get()
    @Roles('admin')
    @ApiOperation({ summary: 'Get all users' })
    async findAll(): Promise<UserEntity[]> {
      this.logger.log('Getting all users');
      return await this.usersService.findAll();
    }
  
    @Get(':id')
    @Roles('admin')
    @ApiOperation({ summary: 'Get a user by ID' })
    @ApiParam({ name: 'id', type: 'number' })
    async findOne(@Param('id') id: number): Promise<UserEntity> {
      this.logger.log(`Getting user with ID: ${id}`);
      const user = await this.usersService.findOne(id);
      if (!user) {
        this.logger.warn(`User with ID: ${id} not found`);
        throw new UserNotFoundException(id);  
      }
      return user;
    }
  
    @Post()
    @Roles('admin')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody({ type: CreateUserDto })
    async create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
      this.logger.log(`Creating a new user: ${createUserDto.name}`);
      const newUser = new UserEntity();
      newUser.name = createUserDto.name;
      newUser.surname = createUserDto.surname;
      newUser.email = createUserDto.email;
      newUser.password = createUserDto.password;
      newUser.role = createUserDto.role;
      return await this.usersService.create(newUser);
    }
  
    @Put(':id')
    @Roles('admin')
    @ApiOperation({ summary: 'Update a user' })
    @ApiParam({ name: 'id', type: 'number' })
    @ApiBody({ type: UpdateUserDto })
    async update(
      @Param('id') id: number,
      @Body() updateUserDto: UpdateUserDto,
    ): Promise<UserEntity> {
      this.logger.log(`Updating user with ID: ${id}`);
      const existingUser = await this.usersService.findOne(id);
      if (!existingUser) {
        this.logger.warn(`User with ID: ${id} not found`);
        throw new UserNotFoundException(id);  
          }
      if (updateUserDto.name) existingUser.name = updateUserDto.name;
      if (updateUserDto.surname) existingUser.surname = updateUserDto.surname;
      if (updateUserDto.email) existingUser.email = updateUserDto.email;
      if (updateUserDto.password) existingUser.password = updateUserDto.password;
      if (updateUserDto.role) existingUser.role = updateUserDto.role;
      return await this.usersService.update(id, existingUser);
    }
  
    @Delete(':id')
    @Roles('admin')
    @ApiOperation({ summary: 'Delete a user' })
    @ApiParam({ name: 'id', type: 'number' })
    async delete(@Param('id') id: number): Promise<void> {
      this.logger.log(`Deleting user with ID: ${id}`);
      const user = await this.usersService.findOne(id);
      if (!user) {
        this.logger.warn(`User with ID: ${id} not found`);
        throw new UserNotFoundException(id);  
      }
      return this.usersService.delete(id);
    }
  }
  