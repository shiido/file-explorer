import { File } from "../domain/file";

export class FileResponse {

   private name: string;
   private children?: Array<FileResponse>;

   constructor(name: string, children?: Array<FileResponse>) {
      this.name = name;
      this.children = children;
   }

   public static fromAggregate(file: File): FileResponse {
      if (file.getFileIsDirectory().getValue()) {
         return new FileResponse(
            file.getFileName().getValue(),
            file.getFiles().map(f => this.fromAggregate(f))
         );
      } else {
         return new FileResponse(
            file.getFileName().getValue()
         );
      }
   }

   public getName(): string {
      return this.name;
   }

   public getChildren(): FileResponse[] {
      return this.children;
   }

}