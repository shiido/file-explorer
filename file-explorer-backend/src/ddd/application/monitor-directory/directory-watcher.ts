import { Injectable } from '@nestjs/common';

import { FolderPath } from 'src/ddd/domain/folder-path';
import { ChokidarFolderWatcher } from 'src/ddd/infrasctructure/chokidar-folder-watcher';
import { FSFolderRepository } from 'src/ddd/infrasctructure/fs-folder-repository';
import { DirectoryWatcherCommand } from './directory-watcher-command';

@Injectable()
export class DirectoryWatcher {
  constructor(
    private readonly folderRepository: FSFolderRepository,
    private readonly chokidarFolderWatcher: ChokidarFolderWatcher,
  ) {}

  public handle(command: DirectoryWatcherCommand): void {
    const folderPath = new FolderPath(command.getPath());

    const directoryExists = this.folderRepository.verifyPath(folderPath);

    if (!directoryExists) {
      throw new Error('Folder does not exists');
    }

    this.chokidarFolderWatcher.monitor(folderPath);
  }
}
