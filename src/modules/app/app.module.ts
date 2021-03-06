import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { createConnection } from 'typeorm';
import { UserModule } from '../users/user.module';
import { TaskModule } from '../tasks/task.module';
import { User } from 'src/entities/user.entity';
import { Task } from 'src/entities/task.entity';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    UserModule,
    TaskModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        autoLoadEntities: true,
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_LOGIN'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        schema: configService.get('DB_SCHEMA'),
        entities: ['./dist/**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: true,
      }),
      connectionFactory: async (options) => {
        return await createConnection(options);
      },
    }),
  ],
})
export class AppModule {}
