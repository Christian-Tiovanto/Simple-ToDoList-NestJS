import { Body, Controller, Get, Post, UsePipes } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserValidationPipe } from 'src/modules/pipes/user-validation.pipe';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<string> {
    return 'ea';
  }
  @Post()
  @UsePipes(new UserValidationPipe())
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.userService.createUser(userDto);
  }
}
