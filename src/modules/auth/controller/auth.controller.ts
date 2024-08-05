import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { AuthService } from '../services/auth.services';
import { ResponseFormatInterceptor } from 'src/interceptors/response-format.interceptor';

@Controller('user')
@UseInterceptors(ResponseFormatInterceptor)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
