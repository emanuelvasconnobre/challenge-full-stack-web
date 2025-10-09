export default class StudentUpdatableAttributes {
  public name: string;
  public email: string;

  constructor(data: { name: string; email: string }) {
    this.name = data.name;
    this.email = data.email;
  }
}
