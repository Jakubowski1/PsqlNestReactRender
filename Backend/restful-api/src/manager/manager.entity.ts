import {PrimaryGeneratedColumn, Column} from "typeorm"
import {ApiProperty} from "@nestjs/swagger"
import { User } from "src/user/user.entity"
import { Entity } from 'typeorm';
import { Role } from 'src/constants/roles.enum';

@Entity()
export class Manager extends User {
    @PrimaryGeneratedColumn()
    
    @ApiProperty({ description: 'Role of the manager', enum: Role })
    role: Role = Role.Manager;
}