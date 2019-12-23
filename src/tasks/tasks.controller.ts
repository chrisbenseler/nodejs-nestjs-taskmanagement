import { Controller, Get, Post, Body, Put, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.model';
import { CreateTaskDTO } from './create-task.dto';
import { UpdateTaskDTO } from './update-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getTasks(@Query() filter): Task[] {
        return this.tasksService.getTasks(filter);
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createTaskDTO: CreateTaskDTO): Task {
        return this.tasksService.create(createTaskDTO);
    }

    @Put('/:id')
    update(
        @Param('id') id: string,
        @Body('task', TaskStatusValidationPipe) task: UpdateTaskDTO) {
        return this.tasksService.update(id, task)
    }

    @Get('/:id')
    get(@Param('id') id: string): Task {
        return this.tasksService.get(id);
    }

    @Delete('/:id')
    delete(@Param('id') id: string) {
        return this.tasksService.delete(id);
    }

    
}
