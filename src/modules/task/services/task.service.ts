import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../models/task.model';
import { DataSource, Repository } from 'typeorm';
import { TaskDto } from '../dtos/task.dto';
import { UserService } from 'src/modules/user/services/user.service';
import { plainToInstance } from 'class-transformer';
import { User } from 'src/modules/user/models/user.model';
import { TaskStatus } from 'src/enums/task-status';
import { UpdateTaskDto } from '../dtos/updateTask.dto';
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private readonly userService: UserService,
  ) {}

  async createTask(taskDto: TaskDto, email: string) {
    let user = await this.userService.getUserbyEmail(email);
    user = plainToInstance(User, user);
    const task = await this.taskRepository.create({ taskDesc: taskDto.taskDesc, user });
    await this.taskRepository.save(task);
    return task;
  }

  async getUserTasks(userEmail: string) {
    const tasks = await this.taskRepository.find({
      where: { user: { email: userEmail } },
    });
    tasks.forEach((task) => {
      task.user = plainToInstance(User, task.user);
    });
    return tasks;
  }

  async updateTaskStatus(updateTaskDto: UpdateTaskDto) {
    const tasks = await this.taskRepository.findOne({ where: { id: updateTaskDto.taskId } });
    if (!tasks) throw new NotFoundException('Task Not Found');
    tasks.status = updateTaskDto.taskStatus;
    await this.taskRepository.save(tasks);
    return tasks;
  }
}
