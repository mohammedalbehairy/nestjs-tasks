import { TaskStatus } from './../task-status.enum';
import { BaseEntity, PrimaryGeneratedColumn, Column } from 'typeorm'

export class Task extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;
}
