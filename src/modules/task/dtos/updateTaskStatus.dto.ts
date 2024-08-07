import { IsEnum, IsNumber } from 'class-validator';
import { TaskStatus } from 'src/enums/task-status';

export class UpdateTaskStatusDto {
  @IsNumber()
  taskId: number;

  @IsEnum(TaskStatus)
  taskStatus: TaskStatus;
}
