import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UpdateTaskDescDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  taskId: number;

  @ApiProperty({ example: 'ini update desc' })
  @IsString()
  taskDesc: string;
}
