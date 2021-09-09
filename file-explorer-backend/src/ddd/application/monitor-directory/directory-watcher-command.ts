export class DirectoryWatcherCommand {
  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  public getPath(): string {
    return this.path;
  }
}
