import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// modules
import { ConfigModule } from '@nestjs/config';
import { DDDModule } from './ddd/ddd.module';

@Module({
  imports: [
    DDDModule,
    ConfigModule.forRoot({
      ignoreEnvFile: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
