import { Logger } from '@nestjs/common';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import * as path from 'path';

import { FileFinder } from '../application/find-files-from-directory/file-finder';
import { FileFinderQuery } from '../application/find-files-from-directory/file-finder-query';
import { DirectoryWatcher } from '../application/monitor-directory/directory-watcher';
import { DirectoryWatcherCommand } from '../application/monitor-directory/directory-watcher-command';
import { LocalEventBus } from '../infrasctructure/local-event-bus';
@WebSocketGateway(8081)
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private readonly logger = new Logger(SocketGateway.name);

  @WebSocketServer()
  server: Server;

  private directories: Array<string>;

  constructor(
    private fileFinder: FileFinder,
    private directoryWatcher: DirectoryWatcher,
  ) {
    this.directories = [];
  }

  afterInit(server: Server) {
    this.logger.log('¡Socket Server on Ready!');

    this.directories = [];

    LocalEventBus.getInstance().register('monitor', (data: any) => {
      if (data) {
        const folderResponse = [];

        this.directories.forEach((directory) => {
          // get files from directory with changes
          const fileResponse = this.fileFinder.handle(
            new FileFinderQuery(directory),
          );
          folderResponse.push(fileResponse);
        });

        const response = {
          folderResponse,
          event: data,
        };

        server.emit('refresh', response);
      }
    });
  }

  handleConnection(client: Socket, ...args: any[]) {
    this.logger.log(`New socket client ${client.id} ${args}`);
  }

  handleDisconnect(client: any) {
    this.logger.log(`Socket left ${client.id}`);
  }

  @SubscribeMessage('monitoring')
  async findFiles(@MessageBody() folders: Array<string>): Promise<any> {
    const foldersToUse = [];
    folders.forEach((folder) => {
      folder = this.cleanPath(folder);
      if (!this.hasItBeenAdded(folder)) {
        foldersToUse.push(folder);
      }
    });

    return this.handleFolderResponse(this.directories.concat(foldersToUse));
  }

  @SubscribeMessage('new-monitoring')
  async registerNewDirectory(@MessageBody() folder: string): Promise<void> {
    folder = this.cleanPath(folder);
    const directories = this.handleFolderResponse(
      this.directories.concat(folder),
    );
    this.server.emit('new-directory', directories);
  }

  private handleFolderResponse(folders: string[]): any[] {
    const folderResponse = [];

    folders.forEach((pathDirectory) => {
      try {
        // get files from directory
        const fileResponse = this.fileFinder.handle(
          new FileFinderQuery(pathDirectory),
        );
        folderResponse.push(fileResponse);

        // verify if folders have already been added
        if (!this.hasItBeenAdded(pathDirectory)) {
          this.directories.push(pathDirectory);

          // start monitoring from directory
          this.directoryWatcher.handle(
            new DirectoryWatcherCommand(pathDirectory),
          );
        }
      } catch (e) {
        this.logger.warn(`Directory Invalid`);
      }
    });

    return folderResponse;
  }

  private hasItBeenAdded(searchDirectory: string): boolean {
    const found = this.directories.find(
      (directory) => directory === searchDirectory,
    );
    return found ? true : false;
  }

  private cleanPath(folder: string) {
    const lastCharacter = folder.charAt(folder.length - 1);
    if (lastCharacter === path.sep) {
      folder = folder.substring(0, folder.length - 1);
    }
    return folder;
  }
}
