import { Inject, Injectable } from '@nestjs/common';

import { File } from '../../domain/file';
import { FolderPath } from '../../domain/folder-path';
import { FileFinderQuery } from './file-finder-query';
import { FileResponse } from '../file-response';
import { FolderRepository } from '../../../ddd/domain/contracts/folder-repository';

@Injectable()
export class FileFinder {
  constructor(
    @Inject('FolderRepository')
    private readonly folderRepository: FolderRepository,
  ) {}

  public handle(query: FileFinderQuery): FileResponse {
    const folderPath = new FolderPath(query.getPath());

    const directoryExists = this.folderRepository.verifyPath(folderPath);

    if (directoryExists) {
      const file: File = this.folderRepository.findFiles(folderPath);
      return FileResponse.fromAggregate(file);
    }

    throw new Error(`Folder ${folderPath.getValue()} does not exists`);
  }
}
