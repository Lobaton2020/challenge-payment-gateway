import { buildMessage, ValidateBy } from 'class-validator';

export function validationPassword(value: string) {
  if (typeof value != 'string') return false;
  if (value.length < 10) return false; // more thank 10 characters
  if (!/[!@#?\]]|kr/i.test(value)) return false; // At least one of the special characteres
  if (!/(?=.*[a-z])(?=.*[A-Z])/.test(value)) return false; // One lowercase at least and one uppercase at least
  return true;
}

export function IsPassword(): PropertyDecorator {
  return ValidateBy({
    name: 'VALIDATION_PASSWORD',
    constraints: [],
    validator: {
      validate: (value): boolean => validationPassword(value),
      defaultMessage: buildMessage(
        () =>
          `password must contains at least 10 characters, one lowercase letter, one uppercase letter and one of the following characters: !, @, #, ? or ].`,
      ),
    },
  });
}
