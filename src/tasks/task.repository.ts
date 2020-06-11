import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Repository, EntityRepository } from "typeorm";
import { Task } from "./entity/task.entity";
import { TaskStatus } from './task-status.enum';
import { InternalServerErrorException } from '@nestjs/common';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task>{

    async getTasks(filterDto: GetTasksFilterDto) {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('task')
        if (status) query.andWhere('task.status = :status', { status })
        if (search) query.andWhere('task.title LIKE :search OR task.description LIKE :search', { search: '%search%' });

        try {
            return await query.getMany();
        } catch (error) {
            throw new InternalServerErrorException;
        }
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