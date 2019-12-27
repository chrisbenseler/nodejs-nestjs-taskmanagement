
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

    async getTasks(filter, user: User): Promise<Task[]> {

        const query = this.taskRepository.createQueryBuilder('task');

        query.where('task.userId = :userId', { userId: user.id })
        
        if(filter.status) {
            query.andWhere('task.status = :status', { status: filter.status });
        }


        const tasks = query.getMany();

        return tasks;
    }

   async create(createTaskDTO: CreateTaskDTO, user: User) {
        return this.taskRepository.createTask(createTaskDTO, user);
    }

    async get(id: number, user: User): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id, userId: user.id }});
        if(!found) {
            throw new NotFoundException();
        }
        return found;
    }

    async delete(id: number, user: User) {
        const found = await this.get(id, user);
        if(!found) {
            throw new NotFoundException();
        }
        this.taskRepository.delete({ id: found.id, userId: user.id });
        
    }

    async update(id: number, updateTaskDTO: UpdateTaskDTO, user: User) {
        const { title, description, status } = updateTaskDTO;
        //const taskId = this.tasks.find( task => task.id === id ).id;
        const task = await this.get(id, user);
        
        this.taskRepository.update(id, {
            title,
            description,
            status
        })
       
        return true;
    }

}
