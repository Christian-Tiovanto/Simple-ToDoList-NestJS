import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/user/models/user.model';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/user/user.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/exception-handler.filter';
import { AuthModule } from './modules/auth/auth.module';
import { Task } from './modules/task/models/task.model';
import { TaskModule } from './modules/task/task.module';
const typeormSettingFactory = (configService: ConfigService) => {
  console.log('process.env.NODE_ENV');
  console.log(`${process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'}`);
  console.log(process.env.DB_HOST);

  const typeOrmConfiguration: Record<string, any> = {
    type: configService.get('DB_TYPE') as any,
    host: configService.get('DB_HOST'),
    port: Number(configService.get('DB_PORT')),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    database: configService.get('DB_NAME'),
    logging: true,
    logger: 'simple-console',
    keepConnectionAlive: true,
    entities: [User, Task],
    migrationsTableName: 'db_migration_table',
    synchronize: true,
    autoLoadEntities: true,
    poolSize: configService.get('DB_CONNECTION_POOL_SIZE') || 5,
  };
  return typeOrmConfiguration;
};
@Module({
  imports: [
    TaskModule,
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`${process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : '.env'}`],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: typeormSettingFactory,
      inject: [ConfigService],
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
