
import { Injectable, NotFoundException } from '@nestjs/common';

import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { CreateTaskDTO } from './create-task.dto';
import { UpdateTaskDTO } from './update-task.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository
    ) {}

    async getTasks(filter): Promise<Task[]> {

        const query = this.taskRepository.createQueryBuilder('task');
        
        if(filter.status) {
            query.andWhere('task.status = :status', { status: filter.status })
        }
        const tasks = query.getMany();

        return tasks;
    }

   async create(createTaskDTO: CreateTaskDTO, user: User) {
        return this.taskRepository.createTask(createTaskDTO, user);
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

    async update(id: number, updateTaskDTO: UpdateTaskDTO) {
        const { title, description, status } = updateTaskDTO;
        //const taskId = this.tasks.find( task => task.id === id ).id;
        const task = await this.get(id);
        
        this.taskRepository.update(id, {
            title,
            description,
            status
        })
       
        return true;
    }

}
