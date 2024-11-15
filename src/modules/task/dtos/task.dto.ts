import { ApiProperty } from '@nestjs/swagger';

export class TaskDto {
  @ApiProperty({ example: 'ini coba desc' })
  taskDesc: string;
}
