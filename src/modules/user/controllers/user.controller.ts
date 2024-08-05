import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';
import { DataValidationPipe } from 'src/pipes/user-validation.pipe';
import { ResponseFormatInterceptor } from 'src/interceptors/response-format.interceptor';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('api/v1/user')
@UseInterceptors(ResponseFormatInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  @UseGuards(JwtAuthGuard)
  async getAllUser(@Request() req) {
    console.log(req.user);
    return await this.userService.getAllUser();
  }

  @Post()
  @UsePipes(new DataValidationPipe())
  async createUser(@Body() userDto: CreateUserDto) {
    return await this.userService.createUser(userDto);
  }
}
