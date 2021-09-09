import { IoAdapter } from '@nestjs/platform-socket.io';
import { ServerOptions } from 'socket.io';

export class SocketAdapter extends IoAdapter {

   createIOServer(
      port: number,
      options?: ServerOptions & {
         namespace?: string;
         server?: any;
      },
   ) {

      const server = super.createIOServer(port, {
         allowEIO3: true,
         cors: {
            methods: ['GET', 'POST'],
            origin: 'http://localhost:3000',
            credentials: true
         }
      });

      return server;
   }

}