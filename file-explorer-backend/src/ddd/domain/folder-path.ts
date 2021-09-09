export class FolderPath {
  private value: string;

  constructor(value: string) {
    this.ensurePath(value);
    this.value = value;
  }

  private ensurePath(value: string): void {
    if (value === null || value.length === 0) throw new Error('Path Invalid');
  }

  public getValue(): string {
    return this.value;
  }
}
