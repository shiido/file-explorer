import { Injectable } from '@nestjs/common';
import { File } from 'src/ddd/domain/file';
import { FolderPath } from 'src/ddd/domain/folder-path';
import { FSFolderRepository } from 'src/ddd/infrasctructure/fs-folder-repository';
import { FileResponse } from '../file-response';
import { FileFinderQuery } from './file-finder-query';

@Injectable()
export class FileFinder {

   constructor(private folderRepository: FSFolderRepository) {

   }

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