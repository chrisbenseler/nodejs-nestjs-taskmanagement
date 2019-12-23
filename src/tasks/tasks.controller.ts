import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDTO } from './create-task.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get('/:id')
    get(
        @Param('id', ParseIntPipe) id: number
    ): Promise<Task> {
        return this.tasksService.get(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(@Body() createTaskDTO: CreateTaskDTO): Promise<Task> {
        return this.tasksService.create(createTaskDTO);
    }

    @Delete('/:id')
    delete(@Param('id') id: number) {
        return this.tasksService.delete(id);
    }

    /*
    @Get()
    getTasks(@Query() filter): Task[] {
        return this.tasksService.getTasks(filter);
    }

    

    @Put('/:id')
    update(
        @Param('id') id: string,
        @Body('task', TaskStatusValidationPipe) task: UpdateTaskDTO) {
        return this.tasksService.update(id, task)
    }

    

    
    */
    
}
