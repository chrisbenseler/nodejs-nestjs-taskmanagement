import { Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe, Body, Delete, Put, Query, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { CreateTaskDTO } from './create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { UpdateTaskDTO } from './update-task.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get('/:id')
    get(
        @Param('id', ParseIntPipe) id: number,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.get(id, user);
    }

    @Post()
    @UsePipes(ValidationPipe)
    create(
        @Body() createTaskDTO: CreateTaskDTO,
        @GetUser() user: User
    ): Promise<Task> {
        return this.tasksService.create(createTaskDTO, user);
    }

    @Delete('/:id')
    delete(
        @Param('id') id: number,
        @GetUser() user: User
    ) {
        return this.tasksService.delete(id, user);
    }

    @Put('/:id')
    update(
        @Param('id') id: number,
        @GetUser() user: User,
        @Body('task', TaskStatusValidationPipe,) task: UpdateTaskDTO) {
            console.log({ task })
        return this.tasksService.update(id, task, user)
    }
    
    @Get()
    getTasks(
        @Query() filter,
        @GetUser() user: User
    ): Promise<Task[]> {
        return this.tasksService.getTasks(filter, user);
    }
    
}
