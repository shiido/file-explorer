import { Injectable } from '@nestjs/common';
import chokidar = require('chokidar');

import { FolderWatcher } from '../domain/contracts/folder-watcher';
import { FolderPath } from '../domain/folder-path';
import { LocalEventBus } from '../infrasctructure/local-event-bus';

@Injectable()
export class ChokidarFolderWatcher implements FolderWatcher {
  monitor(folderPath: FolderPath): boolean {
    const watcher = chokidar.watch(folderPath.getValue(), {
      ignoreInitial: true,
      persistent: true,
      ignorePermissionErrors: true,
    });

    watcher
      .on('add', (path: string) => this.onAdd(path, folderPath.getValue()))

      .on('change', (path: string) =>
        this.onChange(path, folderPath.getValue()),
      )

      .on('unlink', (path: string) =>
        this.onUnlink(path, folderPath.getValue()),
      )

      .on('addDir', (path: string) =>
        this.onAddDir(path, folderPath.getValue()),
      )

      .on('unlinkDir', (path: string) =>
        this.onUnlinkDir(path, folderPath.getValue()),
      );

    return true;
  }

  private onAdd(path: string, directory: string) {
    const data = { path, directory, event: 'add' };
    LocalEventBus.getInstance().dispatch<any>('monitor', data);
  }

  private onChange(path: string, directory: string) {
    const data = { path, directory, event: 'change' };
    LocalEventBus.getInstance().dispatch<any>('monitor', data);
  }

  private onUnlink(path: string, directory: string) {
    const data = { path, directory, event: 'unlink' };
    LocalEventBus.getInstance().dispatch<any>('monitor', data);
  }

  private onAddDir(path: string, directory: string) {
    if (path.indexOf('untitled folder') === -1) {
      const data = { path, directory, event: 'addDir' };
      LocalEventBus.getInstance().dispatch<any>('monitor', data);
    }
  }

  private onUnlinkDir(path: string, directory: string) {
    if (path.indexOf('untitled folder') === -1) {
      const data = { path, directory, event: 'unlinkDir' };
      LocalEventBus.getInstance().dispatch<any>('monitor', data);
    }
  }
}
