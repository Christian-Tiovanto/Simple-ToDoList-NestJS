import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from '../models/user.model';
import { CreateUserDto } from '../dtos/create-user.dto';
import { ErrorCode } from 'src/enums/error-code';
import { DuplicateEmailException } from 'src/exceptions/duplicate-email.exception';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async createUser(userDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.usersRepository.create(userDto);
      console.log(user);
      await this.usersRepository.save(user);
      if (!user.id)
        throw new HttpException('User Create Failed', HttpStatus.BAD_REQUEST);
      return user;
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        error.driverError.code ===
          ErrorCode.POSTGRES_UNIQUE_VIOLATION_ERROR_CODE
      ) {
        console.log(error);
        throw new DuplicateEmailException(
          `${userDto.email} already register`,
          'email',
          userDto.email,
        );
      }
      throw error;
    }
  }

  async getAllUser(): Promise<User[]> {
    const users = await this.usersRepository.find();
    console.log(users);
    return users;
  }
}
