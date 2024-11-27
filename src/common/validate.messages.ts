export const isStringError = (field: { property: string }) =>
  `Поле ${field.property} должно быть строкой.`;

export const invalidEmailError = 'Невалидный email.';
export const incorrectUserRoleError = 'Неверная роль пользователя.';
export const minLengthPasswordError = 'Пароль должен состоять минимум из 8 символов.';
