import { Test, TestingModule } from '@nestjs/testing';

import { SocketGateway } from '../../../ddd/gateway/socket.gateway';
import { FSFolderRepository } from '../../../ddd/infrasctructure/fs-folder-repository';
import { DirectoryWatcher } from '../monitor-directory/directory-watcher';
import { FileFinder } from '../find-files-from-directory/file-finder';
import { DirectoryWatcherCommand } from './directory-watcher-command';
import { TestFolderWatcher } from '../../../ddd/infrasctructure/test-folder-watcher';

describe('Use Case --> Monitor Directory', () => {
  let useCaseDirectoryWatcher: DirectoryWatcher;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [],
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
          useClass: TestFolderWatcher,
        },
      ],
    }).compile();

    useCaseDirectoryWatcher = app.get<DirectoryWatcher>(DirectoryWatcher);
  });

  fit('should start monitoring the folder', () => {
    const currentFolder = __dirname;
    useCaseDirectoryWatcher.handle(new DirectoryWatcherCommand(currentFolder));
    expect(() =>
      useCaseDirectoryWatcher.handle(
        new DirectoryWatcherCommand(currentFolder),
      ),
    ).not.toThrow();
  });

  fit('should throw a exception because the folder does not exists', () => {
    const inexistentFolder = 'inexistentFolder/etc';
    expect(() =>
      useCaseDirectoryWatcher.handle(
        new DirectoryWatcherCommand(inexistentFolder),
      ),
    ).toThrow(`Folder ${inexistentFolder} does not exists`);
  });
});
