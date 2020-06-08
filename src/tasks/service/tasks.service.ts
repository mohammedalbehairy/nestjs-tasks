import { CreateTaskDto } from './../dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './../task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) { }

    async createTask(task: CreateTaskDto) {
        return this.taskRepository.createTask(task);
    }

    async getTasks() {

    }

    async getTaskById(id: number) {
        const task = await this.taskRepository.findOne({ where: { id } })
        if (!task) throw new NotFoundException(`Task with ID : ${id} not found`);
        return task;
    }


}
