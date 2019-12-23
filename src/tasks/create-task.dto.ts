import { IsNotEmpty } from 'class-validator';

export class CreateTaskDTO {
    @IsNotEmpty()
    title: string;

    description: string;
}

