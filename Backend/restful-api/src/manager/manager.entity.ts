import {PrimaryGeneratedColumn, Column} from "typeorm"
import {ApiProperty} from "@nestjs/swagger"
import { User } from "../user/user.entity"
import { Entity } from 'typeorm';
import { Role } from '../constants/roles.enum';

@Entity()
export class Manager extends User {

    @Column({ type: 'enum', enum: Role, default: Role.Manager })
    @ApiProperty({ description: 'Role of the manager', enum: Role })
    role: Role = Role.Manager;
}