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
import { UpdateTaskDto } from '../dtos/updateTask.dto';
import { DataValidationPipe } from 'src/pipes/user-validation.pipe';

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
  async updateTaskStatus(@Body() updateTaskDto: UpdateTaskDto) {
    return await this.taskService.updateTaskStatus(updateTaskDto);
  }
}
