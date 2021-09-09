export class FileName {
  private value: string;

  constructor(value: string) {
    this.ensureName(value);
    this.value = value;
  }

  private ensureName(value: string): void {
    if (value === null || value.length === 0)
      throw new Error(`File name ${value} is invalid`);
  }

  public getValue(): string {
    return this.value;
  }
}
