import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from '../dtos/login.dto';
import { UserService } from 'src/modules/user/services/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async login(loginDto: LoginDto) {
    const user = await this.userService.getUserbyEmail(loginDto.email);
    if (!user && !(await bcrypt.compare(loginDto.password.toString(), user.password)))
      throw new UnauthorizedException('Invalid Email | password');
    const token = await jwt.sign(user.email, process.env.JWT_SECRET);
    return {
      message: 'Login Successfull',
      token,
    };
  }
}
