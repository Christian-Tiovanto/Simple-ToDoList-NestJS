import {
  Body,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UserValidationPipe } from 'src/pipes/user-validation.pipe';
import { ResponseFormatInterceptor } from 'src/interceptors/response-format.interceptor';

@Controller('user')
@UseInterceptors(ResponseFormatInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  async getAllUser() {
    return await this.userService.getAllUser();
  }
  @Post()
  @UsePipes(new UserValidationPipe())
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.userService.createUser(userDto);
  }
}
