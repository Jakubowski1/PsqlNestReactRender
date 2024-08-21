import {PrimaryGeneratedColumn, Column} from "typeorm"
import {ApiProperty} from "@nestjs/swagger"
import { User } from "src/user/user.entity"

export class Manager extends User {
    @PrimaryGeneratedColumn()
    
    @ApiProperty({ description: 'Unique identifier for the manager' })
    id: number;

    @ApiProperty({ example: 'John', description: 'The name of the manager' })
    @Column()
    name: string;

    @ApiProperty({ example: 'Doe', description: 'The surname of the manager' })
    @Column()
    surname: string;
}