import { Task } from './task.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDTO } from './create-task.dto';
import { TasksStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

    async createTask(createTaskDto: CreateTaskDTO, user: User): Promise<Task> {
        const { title, description } = createTaskDto;
        let task = new Task();
        task.title = title;
        task.description = description;
        task.status = TasksStatus.OPEN;
        task.user = user;
        await task.save();

        delete task.user;

        return task;

    }
}