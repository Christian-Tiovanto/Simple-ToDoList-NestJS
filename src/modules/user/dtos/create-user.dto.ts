import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'christiantiovanto@gmail.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'christian' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'tiovanto' })
  @IsString()
  lastName: string;

  @ApiProperty({ example: '123456' })
  @IsString()
  password: string;
}
