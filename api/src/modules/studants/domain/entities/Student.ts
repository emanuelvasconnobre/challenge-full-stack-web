export default class Student {
  public readonly id: string;
  public name: string;
  public email: string;
  public cpf: string;
  public RA: string;

  public readonly createdAt: Date;
  public readonly modifiedAt: Date;

  constructor(data: {
    id: string;
    name: string;
    email: string;
    cpf: string;
    RA: string;
    createdAt: Date;
    modifiedAt: Date;
  }) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.cpf = data.cpf;
    this.RA = data.RA;
    this.createdAt = data.createdAt;
    this.modifiedAt = data.modifiedAt;
  }
}
