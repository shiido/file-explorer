import { Inject, Injectable } from '@nestjs/common';
import { FolderRepository } from '../../../ddd/domain/contracts/folder-repository';
import { FolderWatcher } from '../../../ddd/domain/contracts/folder-watcher';
import { FolderPath } from '../../../ddd/domain/folder-path';
import { DirectoryWatcherCommand } from './directory-watcher-command';

@Injectable()
export class DirectoryWatcher {
  constructor(
    @Inject('FolderRepository')
    private readonly folderRepository: FolderRepository,
    @Inject('FolderWatcher')
    private readonly chokidarFolderWatcher: FolderWatcher,
  ) {}

  public handle(command: DirectoryWatcherCommand): void {
    const folderPath = new FolderPath(command.getPath());

    const directoryExists = this.folderRepository.verifyPath(folderPath);

    if (!directoryExists) {
      throw new Error(`Folder ${folderPath.getValue()} does not exists`);
    }

    this.chokidarFolderWatcher.monitor(folderPath);
  }
}
