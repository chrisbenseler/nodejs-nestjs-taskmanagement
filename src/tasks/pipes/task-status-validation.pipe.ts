import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TasksStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    transform(value: any) {
        const status = value.status;
        if(TasksStatus[status]) {
            return true;
        }
        throw new BadRequestException('Status invalid');
    }
}