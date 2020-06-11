import { TaskStatus } from "../task-status.enum";
import { IsOptional, IsIn } from "class-validator";

export class GetTasksFilterDto {
    @IsOptional()
    @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
    status: TaskStatus;

    search: string;
}