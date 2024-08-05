import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TaskDto } from '../dtos/task.dto';
import { UpdateTaskStatusDto } from '../dtos/updateTaskStatus.dto';
import { DataValidationPipe } from 'src/pipes/user-validation.pipe';
import { UpdateTaskDescDto } from '../dtos/updateTaskDesc.dto';

@Controller('api/v1/task')
@UseGuards(JwtAuthGuard)
@UsePipes(DataValidationPipe)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(@Request() req, @Body() taskDto: TaskDto) {
    return await this.taskService.createTask(taskDto, req.user.email);
  }

  @Get()
  async getUserTasks(@Request() req) {
    return await this.taskService.getUserTasks(req.user.email);
  }

  @Patch('update')
  async updateTaskStatus(@Body() updateTaskStatusDto: UpdateTaskStatusDto) {
    return await this.taskService.updateTaskStatus(updateTaskStatusDto);
  }

  @Patch('updateDesc')
  async updateTaskDesc(@Body() updateTaskDescDto: UpdateTaskDescDto) {
    return await this.taskService.updateTaskDesc(updateTaskDescDto);
  }
}
