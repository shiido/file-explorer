import { Injectable } from '@nestjs/common';

import { FolderWatcher } from '../domain/contracts/folder-watcher';
import { FolderPath } from '../domain/folder-path';

@Injectable()
export class TestFolderWatcher implements FolderWatcher {
  monitor(folderPath: FolderPath): boolean {
    return folderPath ? true : false;
  }
}
