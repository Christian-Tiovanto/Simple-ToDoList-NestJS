import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber } from 'class-validator';
import { TaskStatus } from 'src/enums/task-status';

export class UpdateTaskStatusDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  taskId: number;

  @ApiProperty({ example: TaskStatus.DONE })
  @IsEnum(TaskStatus)
  taskStatus: TaskStatus;
}
