import type { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';

enum ErrorTypes {
  // Невалидное значение
  Invalid = 'invalid',
  // Некорректное значение, отсутствующее в списке
  Incorrect = 'incorrect',
  // Значение должно быть идентификатором
  Identifier = 'identifier',
  // Значение должно быть числом
  Number = 'number',
  // Значение должно быть меньше установленного
  Max = 'max',
  // Значение должно быть больше установленного
  Min = 'min',
  // Значение должно быть строкой
  String = 'string',
  // Пароль должен быть строгим
  Strong = 'strong',
  // Слишком короткое значение
  Short = 'short',
  // Слишком длинное значение
  Long = 'long',
}

const createErrorMessage =
  (errorType: ErrorTypes) => (add?: number | string) => (field: ValidationArguments) =>
    `${errorType}.${field.property}${add ? `.${add}` : ''}`;

export const strongPasswordError = `${ErrorTypes.Strong}.password`;
export const maxError = createErrorMessage(ErrorTypes.Max);
export const minError = createErrorMessage(ErrorTypes.Min);
export const longError = createErrorMessage(ErrorTypes.Long);
export const shortError = createErrorMessage(ErrorTypes.Short);
export const numberError = createErrorMessage(ErrorTypes.Number);
export const stringError = createErrorMessage(ErrorTypes.String);
export const invalidError = createErrorMessage(ErrorTypes.Invalid);
export const incorrectError = createErrorMessage(ErrorTypes.Incorrect);
export const identifierError = createErrorMessage(ErrorTypes.Identifier);
