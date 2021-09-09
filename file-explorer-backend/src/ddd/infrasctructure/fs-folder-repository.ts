import { Injectable } from '@nestjs/common';
import { File } from '../domain/file';
import { FileIsDirectory } from '../domain/file-is-directory';
import { FileName } from '../domain/file-name';

import { FolderPath } from '../domain/folder-path';
import { FolderRepository } from '../domain/contracts/folder-repository';

const fs = require('fs');
const path = require('path');

@Injectable()
export class FSFolderRepository implements FolderRepository {

   constructor() {

   }

   verifyPath(path: FolderPath): boolean {
      try {
         return fs.existsSync(path.getValue()) && fs.statSync(path.getValue()).isDirectory();
      } catch (e) {
         return false;
      }
   }

   findFiles(folderPath: FolderPath): File {
      return this.getFiles(folderPath.getValue());
   }

   getFiles(directory: string): File {

      const directorySplit = directory.split(path.sep);

      const f = new File(new FileName(directorySplit[directorySplit.length - 1]), new FileIsDirectory(true), []);

      fs.readdirSync(directory).forEach((file: any) => {
         const absolute = path.join(directory, file);
         if (fs.statSync(absolute).isDirectory()) {
            return f.addFile(this.getFiles(absolute));
         } else {
            return f.addFile(new File(new FileName(file), new FileIsDirectory(false), []));
         }
      });

      return f;
   }

}