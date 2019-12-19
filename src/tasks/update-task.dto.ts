import { TasksStatus } from "./task.model";

export interface UpdateTaskDTO {
    title: string;
    description: string;
    status: TasksStatus
}
