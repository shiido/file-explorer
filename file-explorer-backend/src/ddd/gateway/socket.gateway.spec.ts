import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../../src/app.module';
import * as io from 'socket.io-client';
import { SocketAdapter } from './socket.adapter';

describe('Gateway ---> Websocket', () => {
  let app: INestApplication;
  let connectToSocketIO: () => SocketIOClient.Socket;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useWebSocketAdapter(new SocketAdapter(app));
    await app.init();
    await app.listen(0);
    connectToSocketIO = () =>
      io.connect(`http://localhost:8081`, {
        transports: ['websocket'],
        forceNew: true,
      });
  });

  afterEach(async () => {
    await app.close();
  });

  it('should connect and disconnect', (done) => {
    const socket = connectToSocketIO();

    socket.on('connect', () => {
      socket.disconnect();
    });

    socket.on('disconnect', (reason: any) => {
      expect(reason).toBe('io client disconnect');
      done();
    });

    socket.on('error', done);
  });

  it('should receive data sending a valid folder', (done) => {
    const socket = connectToSocketIO();

    socket.on('connect', () => {
      socket.emit('monitoring', [__dirname], (response: any) => {
        expect(response).not.toBeNull();
        socket.disconnect();
        done();
      });
    });

    socket.on('error', done);
  });

  it('should receive data from new-monitoring event', (done) => {
    const socket = connectToSocketIO();

    socket.on('connect', () => {
      socket.emit('new-monitoring', 'directoryWrong');
    });

    socket.on('new-directory', function (data: any) {
      expect(data).not.toBeNull();
      socket.disconnect();
      done();
    });

    socket.on('error', done);
  });
});
