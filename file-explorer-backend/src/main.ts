import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SocketAdapter } from './ddd/gateway/socket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useWebSocketAdapter(new SocketAdapter(app));

  await app.listen(3005);
}
bootstrap();
