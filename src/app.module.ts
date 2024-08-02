import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/models/user.model';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/exception-handler.filter';

@Module({
  imports: [
    UsersModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: 'SIMPLELEARNINGAPP',
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
