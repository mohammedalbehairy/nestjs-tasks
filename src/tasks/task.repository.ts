import { CreateTaskDto } from './dto/create-task.dto';
import { Repository, EntityRepository } from "typeorm";
import { Task } from "./entity/task.entity";
import { TaskStatus } from './task-status.enum';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    getTasks() {

    }

    async createTask(createTaskDto: CreateTaskDto) {
        const { title, description } = createTaskDto;

        const task = new Task();
        task.title = title;
        task.description = description;
        task.status = TaskStatus.OPEN;

        try {
            await task.save();
        } catch (error) {
            throw new InternalServerErrorException;
        }
    }


}