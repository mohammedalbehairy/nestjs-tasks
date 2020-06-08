import { TasksService } from './../service/tasks.service';
import { Controller, Get, Param, Post, Body, Put, Delete, ParseIntPipe } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks() {
        return this.tasksService.getTasks();
    }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() body: any) {
        this.tasksService.createTask(body);
    }
}
