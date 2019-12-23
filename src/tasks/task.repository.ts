import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './create-task.dto';
import { TasksStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDTO): Promise<Task> {
        const { title, description } = createTaskDto;
        let task = new Task();
        task.title = title;
        task.description = description;
        task.status = TasksStatus.OPEN;
        await task.save();

        return task;

    }
}