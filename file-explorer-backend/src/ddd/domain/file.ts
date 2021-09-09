import { FileIsDirectory } from "./file-is-directory";
import { FileName } from "./file-name";

export class File {

   private fileName: FileName;
   private files: Array<File>;
   private isDirectory: FileIsDirectory;

   constructor(fileName: FileName, isDirectory: FileIsDirectory, files?: Array<File>) {
      this.fileName = fileName;
      this.files = files;
      this.isDirectory = isDirectory;
   }

   public getFileName(): FileName {
      return this.fileName;
   }

   public getFiles(): Array<File> {
      return this.files;
   }

   public getFileIsDirectory(): FileIsDirectory {
      return this.isDirectory;
   }

   public addFile(file: File): boolean {
      this.files.push(file);
      return true;
   }

}