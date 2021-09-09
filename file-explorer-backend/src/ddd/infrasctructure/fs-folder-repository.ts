import { Injectable } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs';

import { File } from '../domain/file';
import { FileIsDirectory } from '../domain/file-is-directory';
import { FileName } from '../domain/file-name';
import { FolderPath } from '../domain/folder-path';
import { FolderRepository } from '../domain/contracts/folder-repository';

@Injectable()
export class FSFolderRepository implements FolderRepository {
  verifyPath(path: FolderPath): boolean {
    try {
      return (
        fs.existsSync(path.getValue()) &&
        fs.statSync(path.getValue()).isDirectory()
      );
    } catch (e) {
      return false;
    }
  }

  findFiles(folderPath: FolderPath): File {
    return this.getFiles(folderPath.getValue());
  }

  private getFiles(directory: string): File {
    const directorySplit = directory.split(path.sep);

    const fileDomain = new File(
      new FileName(directorySplit[directorySplit.length - 1]),
      new FileIsDirectory(true),
      [],
    );

    fs.readdirSync(directory).forEach((file: any) => {
      const absolute = path.join(directory, file);
      if (fs.statSync(absolute).isDirectory()) {
        return fileDomain.addFile(this.getFiles(absolute));
      } else {
        return fileDomain.addFile(
          new File(new FileName(file), new FileIsDirectory(false), []),
        );
      }
    });

    return fileDomain;
  }
}
