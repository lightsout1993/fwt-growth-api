import type { ValidationArguments } from 'class-validator/types/validation/ValidationArguments';

export const isStringError = (field: ValidationArguments) =>
  `Поле ${field.property} должно быть строкой.`;

export const invalidEmailError = 'Невалидный email.';
export const incorrectUserRoleError = 'Неверная роль пользователя.';
export const minLengthPasswordError = 'Пароль должен состоять минимум из 8 символов.';
