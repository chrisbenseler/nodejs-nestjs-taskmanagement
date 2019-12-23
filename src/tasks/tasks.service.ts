
import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './create-task.dto';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    /*
    private tasks: Task[] = [];

    getTasks(filter): Task[] {

        const tasks =  this.tasks;

        if(filter.status) {
            return tasks.filter( task => task.status == filter.status)
        }

        return tasks;
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

    
    */

   async create(createTaskDTO: CreateTaskDTO) {
        
        return this.taskRepository.createTask(createTaskDTO);
    }

    async get(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);
        if(!found) {
            throw new NotFoundException();
        }
        return found;
    }

    async delete(id: number) {
        const found = await this.get(id);
        if(!found) {
            throw new NotFoundException();
        }
        this.taskRepository.delete(found.id);
        
    }

}
