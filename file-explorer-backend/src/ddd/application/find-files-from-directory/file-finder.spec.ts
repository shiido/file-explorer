import { Test, TestingModule } from '@nestjs/testing';

import { SocketGateway } from '../../../ddd/gateway/socket.gateway';
import { ChokidarFolderWatcher } from '../../../ddd/infrasctructure/chokidar-folder-watcher';
import { FSFolderRepository } from '../../../ddd/infrasctructure/fs-folder-repository';
import { FileResponse } from '../file-response';
import { DirectoryWatcher } from '../monitor-directory/directory-watcher';

import { FileFinder } from './file-finder';
import { FileFinderQuery } from './file-finder-query';

describe('Use Case --> Find Files From Directory', () => {
  let useCaseFileFinder: FileFinder;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
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
    }).compile();

    useCaseFileFinder = app.get<FileFinder>(FileFinder);
  });

  fit('should return a instance of FileResponse', () => {
    const currentFolder = __dirname;
    const fileResponse = useCaseFileFinder.handle(
      new FileFinderQuery(currentFolder),
    );
    expect(fileResponse).toBeInstanceOf(FileResponse);
  });

  fit('should throw a exception because the folder does not exists', () => {
    const inexistentFolder = 'inexistentFolder/etc';
    expect(() =>
      useCaseFileFinder.handle(new FileFinderQuery(inexistentFolder)),
    ).toThrow(`Folder ${inexistentFolder} does not exists`);
  });
});
