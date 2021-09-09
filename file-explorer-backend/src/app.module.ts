import { APP_FILTER } from '@nestjs/core';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DDDModule } from './ddd/ddd.module';

@Module({
  imports: [DDDModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
