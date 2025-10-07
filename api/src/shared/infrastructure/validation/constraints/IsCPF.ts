import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ async: false })
export class IsCPFConstraint implements ValidatorConstraintInterface {
  validate(value: any): boolean {
    if (typeof value !== "string") return false;

    const cpf = value.replace(/\D/g, "");
    if (cpf.length !== 11) return false;
    if (/^(\d)\1{10}$/.test(cpf)) return false;

    const calcCheckDigit = (baseLength: number) => {
      let sum = 0;
      for (let i = 0; i < baseLength; i++) {
        sum += parseInt(cpf.charAt(i)) * (baseLength + 1 - i);
      }
      const result = (sum * 10) % 11;
      return result === 10 ? 0 : result;
    };

    const digit1 = calcCheckDigit(9);
    const digit2 = calcCheckDigit(10);

    return digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10));
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be a valid CPF`;
  }
}

export default function IsCPF(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsCPFConstraint,
    });
  };
}
