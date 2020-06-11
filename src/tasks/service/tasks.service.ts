import { TaskStatus } from './../task-status.enum';
import { GetTasksFilterDto } from './../dto/get-tasks-filter.dto';
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

    async getTasks(filterDto: GetTasksFilterDto) {
        return await this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number) {
        const task = await this.taskRepository.findOne({ where: { id } })
        if (!task) throw new NotFoundException(`Task with ID : ${id} not found`);
        return task;
    }

    async deleteTaskById(id: number) {
        const result = await this.taskRepository.delete({ id });
        if (result.affected === 0) throw new NotFoundException(`Task with ID : ${id} not found`);
    }

    async updateTaskStatus(id: number, status: TaskStatus) {
        const task = await this.taskRepository.findOne({ id });
        if (!task) throw new NotFoundException(`Task with ID : ${id} not found`);
        task.status = status;
        return await task.save();
    }
}
