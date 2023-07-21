const STATUS_OK_CREATED = 201;
const STATUS_OK = 200;
const LOGIN_ERROR = 'Неверные почта или пароль';
const EMAIL_VALIDATION_ERROR = 'Некорректный email.';
const URL_VALIDATION_ERROR = 'Неккоректный URL.';
const DUPLICATE_ERROR = 'Пользователь с таким email уже существует.';
const ID_NOT_FOUND_ERROR = 'Указанный id не найденБ либо указан не верный id.';
const NOT_FOUND_ERROR = 'Указанный путь не найден.';
const SERVER_ERROR = 'На сервере произошла ошибка.';
const TOKEN_ERROR = 'С токеном что-то не так.';
const FORBIDDEN_ERROR = 'Недостаточно прав.';

module.exports = {
  STATUS_OK_CREATED,
  STATUS_OK,
  LOGIN_ERROR,
  EMAIL_VALIDATION_ERROR,
  URL_VALIDATION_ERROR,
  DUPLICATE_ERROR,
  ID_NOT_FOUND_ERROR,
  NOT_FOUND_ERROR,
  SERVER_ERROR,
  TOKEN_ERROR,
  FORBIDDEN_ERROR,
};
