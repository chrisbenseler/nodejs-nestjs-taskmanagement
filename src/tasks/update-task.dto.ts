import { TasksStatus } from "./task-status.enum";

export interface UpdateTaskDTO {
    title: string;
    description: string;
    status: TasksStatus
}
