import {ChildEntity, Column} from "typeorm"
import {ApiProperty} from "@nestjs/swagger"
import { User } from "../user/user.entity"
import { Role } from '../constants/roles.enum';

@ChildEntity('manager')
export class Manager extends User {

    @Column({ type: 'enum', enum: Role, default: Role.Manager })
    @ApiProperty({ description: 'Role of the manager', enum: Role })
    role: Role = Role.Manager;
}