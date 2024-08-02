import {
  HttpException,
  HttpStatus,
  Injectable,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../models/user.model';
import { TransformInterceptor } from 'src/interceptors/response-mapping.interceptor';
import { CreateUserDto } from '../dtos/create-user.dto';

@Injectable()
@UseInterceptors(TransformInterceptor)
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  @Post()
  async createUser(userDto: CreateUserDto): Promise<User> {
    const user = await this.usersRepository.create(userDto);
    return user;
  }
}
