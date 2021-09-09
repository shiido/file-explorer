import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketAdapter } from './ddd/gateway/socket.adapter';
import { env } from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useWebSocketAdapter(new SocketAdapter(app));
  const port = env.PORT || 3011;
  await app.listen(port);
}
bootstrap();
