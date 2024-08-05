import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { TaskService } from '../services/task.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TaskDto } from '../dtos/task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTask(@Request() req, @Body() taskDto: TaskDto) {
    return await this.taskService.createTask(taskDto, req.user.email);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getUserTasks(@Request() req) {
    console.log(req.user.email);
    return await this.taskService.getUserTasks('christiantiovanto32@gmail.com');
  }
}
