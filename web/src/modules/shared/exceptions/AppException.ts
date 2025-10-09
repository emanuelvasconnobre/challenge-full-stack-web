export class AppException<D = object | undefined> extends Error {
  public readonly name: string;
  public readonly details: D;

  constructor(message: string, details: D) {
    super(message);
    this.name = this.constructor.name;
    this.details = details;
  }
}
