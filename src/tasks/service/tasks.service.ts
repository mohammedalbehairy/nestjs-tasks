import { Injectable } from '@nestjs/common';
import { TaskRepository } from './../task.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksService {
    constructor(@InjectRepository(TaskRepository) private taskRepository: TaskRepository) { }

    async createTask(task: any) {
        return this.taskRepository.createTask(task);
    }

    async getTasks() {

    }

    async getTaskById(id: number) {

    }


}
