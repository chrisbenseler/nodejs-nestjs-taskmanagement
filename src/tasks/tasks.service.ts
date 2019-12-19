import * as uuid from 'uuid';
import { Injectable } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { CreateTaskDTO } from './create-task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getAllTasks(): Task[] {
        return this.tasks;
    }

    create(createTaskDTO: CreateTaskDTO) {
        const { title, description } = createTaskDTO;
        const task: Task = {
            id: uuid(),
            title,
            description,
            status: TasksStatus.OPEN
        }
        this.tasks = this.tasks.concat(task);
        return task;
    }

}
