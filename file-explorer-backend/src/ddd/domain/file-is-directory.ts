export class FileIsDirectory {
  private value: boolean;

  constructor(value: boolean) {
    this.value = value;
  }

  public getValue(): boolean {
    return this.value;
  }
}
