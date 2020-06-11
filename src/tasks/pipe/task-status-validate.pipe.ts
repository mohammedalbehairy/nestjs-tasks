import { TaskStatus } from './../task-status.enum';
import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';

@Injectable()
export class TaskStatusValidatePipe implements PipeTransform {

  allowed = [TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE];

  transform(value: any) {
    if (!this.isValid(value)) throw new BadRequestException(`${value} isn't a valid status`);
    return value;
  }

  isValid(value) {
    if (this.allowed.indexOf(value) > 0) return true;
  }
}
