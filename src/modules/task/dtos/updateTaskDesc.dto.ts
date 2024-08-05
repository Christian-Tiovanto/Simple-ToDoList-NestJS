import { IsNumber, IsString } from 'class-validator';

export class UpdateTaskDescDto {
  @IsNumber()
  taskId: number;

  @IsString()
  taskDesc: string;
}
