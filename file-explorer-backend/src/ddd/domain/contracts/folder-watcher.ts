import { FolderPath } from '../folder-path';
export interface FolderWatcher {
  monitor(path: FolderPath): void;
}
