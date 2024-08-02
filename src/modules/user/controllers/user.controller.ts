import { Controller, Get, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../models/user.model';
import { Repository } from 'typeorm';

@Controller('user')
export class UserController {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  @Get()
  async findAll(): Promise<string> {
    return 'ea';
  }
  @Post()
  async create(): Promise<string> {
    return 'This action returns all cats';
  }
}
