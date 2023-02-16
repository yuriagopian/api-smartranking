import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsEmailPassed implements ValidatorConstraintInterface {
  validate(email: string) {
    if (email) {
      return false;
    }
  }
}

export function EmailCanNotBeUpdated(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailPassed,
    });
  };
}
