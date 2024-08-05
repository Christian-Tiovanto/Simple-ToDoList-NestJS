import { Module } from '@nestjs/common';
import { TaskService } from './services/task.service';
import { TaskController } from './controllers/task.controller';
import { JwtStrategy } from '../auth/strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './models/task.model';
import { User } from '../user/models/user.model';
import { UsersModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task, User]), UsersModule],
  providers: [TaskService, JwtStrategy],
  controllers: [TaskController],
})
export class TaskModule {}
