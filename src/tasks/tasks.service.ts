import * as uuid from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TasksStatus } from './task.model';
import { CreateTaskDTO } from './create-task.dto';
import { UpdateTaskDTO } from './update-task.dto';

@Injectable()
export class TasksService {

    private tasks: Task[] = [];

    getTasks(filter): Task[] {

        const tasks =  this.tasks;

        if(filter.status) {
            return tasks.filter( task => task.status == filter.status)
        }

        return tasks;
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

    update(id: string, updateTaskDTO: UpdateTaskDTO) {
        const { title, description, status } = updateTaskDTO;
        //const taskId = this.tasks.find( task => task.id === id ).id;
        const taskId = this.get(id).id;
        const newTask: Task = {
            id: taskId,
            title,
            description,
            status
        }
        this.tasks = this.tasks.map(task => task.id === taskId ? newTask : task);
        return true;
    }

    get(id: string): Task {
        const found = this.tasks.find( task => task.id === id );
        if(!found) {
            throw new NotFoundException();
        }

        return found;
    }

    delete(id: string) {
        this.tasks = this.tasks.filter( task => task.id !== id );
    }

}
