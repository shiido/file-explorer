import { Module } from '@nestjs/common';

import { FileFinder } from './application/find-files-from-directory/file-finder';
import { DirectoryWatcher } from './application/monitor-directory/directory-watcher';
import { SocketGateway } from './gateway/socket.gateway';
import { ChokidarFolderWatcher } from './infrasctructure/chokidar-folder-watcher';
import { FSFolderRepository } from './infrasctructure/fs-folder-repository';

@Module({
  providers: [
    SocketGateway,
    FileFinder,
    DirectoryWatcher,
    {
      provide: 'FolderRepository',
      useClass: FSFolderRepository,
    },
    {
      provide: 'FolderWatcher',
      useClass: ChokidarFolderWatcher,
    },
  ],
})
export class DDDModule {}
