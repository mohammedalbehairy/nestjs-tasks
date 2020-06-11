import { TaskStatusValidatePipe } from './../pipe/task-status-validate.pipe';
import { TaskStatus } from './../task-status.enum';
import { GetTasksFilterDto } from './../dto/get-tasks-filter.dto';
import { CreateTaskDto } from './../dto/create-task.dto';
import { TasksService } from './../service/tasks.service';
import { Controller, Get, Param, Post, Body, Put, Delete, ParseIntPipe, ValidationPipe, Query } from '@nestjs/common';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) { }

    @Get()
    getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto) {
        return this.tasksService.getTasks(filterDto);
    }

    @Get(':id')
    getTaskById(@Param('id', ParseIntPipe) id: number) {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() CreateTaskDto: CreateTaskDto) {
        this.tasksService.createTask(CreateTaskDto);
    }

    @Delete(':id')
    deleteTaskById(@Param('id', ParseIntPipe) id: number) {
        this.tasksService.deleteTaskById(id);
        return { deleted: true }
    }

    @Delete(':id/status')
    updateTaskStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status', TaskStatusValidatePipe) status: TaskStatus
    ) {
        this.tasksService.updateTaskStatus(id, status);
        return { deleted: true }
    }
}
