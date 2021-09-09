import { File } from "../file";
import { FolderPath } from "../folder-path";

export interface FolderRepository {
   verifyPath(path: FolderPath): boolean;
   findFiles(path: FolderPath): File;
}