import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, Delete, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDTO } from './create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { UpdateTaskDTO } from './update-task.dto';

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

    @Put('/:id')
    update(
        @Param('id') id: number,
        @Body('task', TaskStatusValidationPipe) task: UpdateTaskDTO) {
            console.log({ task })
        return this.tasksService.update(id, task)
    }

    /*
    @Get()
    getTasks(@Query() filter): Task[] {
        return this.tasksService.getTasks(filter);
    }

    

   

    

    
    */
    
}
